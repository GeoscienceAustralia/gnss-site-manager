import { Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AbstractBaseComponent } from './abstract-base.component';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../global/misc-utils';
import * as lodash from 'lodash';
import { UserAuthService } from '../global/user-auth.service';

export const newItemShouldBeBlank: boolean = true;

export abstract class AbstractGroupComponent<T extends AbstractViewModel> extends AbstractBaseComponent implements OnInit {
    isGroupOpen: boolean = false;

    // flag to indicate that the current or latest item in a group has an end date set
    currentItemAlreadyHasEndDate: boolean = false;

    miscUtils: any = MiscUtils;
    protected groupArrayForm: FormArray;

    @Input() parentForm: FormGroup;

    @Input()
    set siteLogModel(siteLogModel: any) {
       if (siteLogModel) {
           this.setItemsCollection(this.getFormData(siteLogModel));
           this.setupChildItems();
       }
    }

    /**
     * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
     * @type {{name: EventNames}}
     */
    private geodesyEvent: GeodesyEvent = new GeodesyEvent(EventNames.none);

    /**
     * All the items.  They are stored in ascending order so that the oldest items are 'left-most' in the array.
     * The sorting field is determined through the abstract method compare(left, right)).
     *
     * The display order on the form is in reverse with the oldest items at the bottom.  This is achieved with the method
     * getItemsCollection().
     *
     */
    private itemProperties: T[];

    public static compare(obj1: AbstractViewModel, obj2: AbstractViewModel): number {
        return AbstractGroupComponent.compareDates(obj1.startDate, obj2.startDate);
    }

    /**
     * Compare dates.
     * @param date1
     * @param date2
     * @return -1 if date1 < date2, 1 if date1 > date2, and 0 if date1 == date2
     */
    public static compareDates(date1: string, date2: string): number {
        if (date1 < date2) {
            return -1;
        } else if (date1 > date2) {
            return 1;
        } else {
            return 0;
        }
    }

    constructor(protected userAuthService: UserAuthService, protected formBuilder: FormBuilder) {
        super(userAuthService);
    }

    ngOnInit() {
        this.setupForm(this.getControlName());
    }

    /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

    abstract getControlName(): string;

    abstract newItemViewModel(): T;

    getFormData(siteLog: any): any {
        return siteLog[this.getControlName()];
    }

    /**
     * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
     *
     * @returns {GeodesyEvent}
     */
    getGeodesyEvent(): GeodesyEvent {
        return this.geodesyEvent;
    }

    getIsGroupOpen(): boolean {
        return this.isGroupOpen;
    }

    /**
     * Return collection - optionally with deleted items filter out.  Always in reverse order.
     * @param showDeleted - true by default
     * @return {T[]}
     */
    getItemsCollection(showDeleted?: boolean): T[] {
        let doShowDeleted: boolean = true;
        if (showDeleted !== undefined) {
            doShowDeleted = showDeleted;
        }

        if (this.itemProperties) {
            let filteredOrNot: T[] = doShowDeleted ? lodash.clone(this.itemProperties) : this.itemProperties.filter(this.isntDeleted);
            return filteredOrNot;
        } else {
            return [];
        }
    }

    isEmptyCollection(): boolean {
        return (!this.itemProperties || this.itemProperties.length === 0);
    }

    setItemsCollection(itemProperties: T[]) {
        this.itemProperties = itemProperties;
        if (itemProperties && itemProperties.length > 0) {
            this.sortUsingComparator(this.itemProperties);
        }
    }

    /**
     * @param item
     * @param origItem
     *
     * @return index in itemProperties (and FormArray) where item is inserted
     */
    addToItemsCollection(item: T) {
        this.itemProperties.splice(0, 0, item);
        this.addChildItemToForm();
    }

    /**
     * This is the event handler called by children
     * @param geodesyEvent
     */
    returnEvents(geodesyEvent: GeodesyEvent) {
        switch (geodesyEvent.name) {
            case EventNames.removeItem:
                this.removeItem(geodesyEvent.valueNumber, geodesyEvent.valueString);
                break;
            case EventNames.cancelNew:
                this.cancelNew(geodesyEvent.valueNumber);
                break;
            default:
                console.log('returnEvents - unknown event: ', EventNames[geodesyEvent.name]);
        }
    }

    addNew(event: UIEvent) {
        event.preventDefault();
        this.addNewItem();
        this.newItemEvent();
    }

    /**
     * Setup the form for the group.  It will contain an array of Items.
     *
     * @param itemsArrayName that is set on the parentForm
     */
    setupForm(itemsArrayName: string) {
        this.groupArrayForm = this.formBuilder.array([]);
        if (this.parentForm.controls[itemsArrayName]) {
            this.parentForm.removeControl(itemsArrayName);
        }
        this.parentForm.addControl(itemsArrayName, this.groupArrayForm);
    }

    setupChildItems() {
        for (let viewModel of this.getItemsCollection()) {
            this.addChildItemToForm();
        }
    }

    /**
     * The form data model needs to be updated when new items are added.
     *
     * @param isItDirty if to mark it dirty or not.
     */
    addChildItemToForm(isItDirty: boolean = false) {
        let itemGroup: FormGroup = this.formBuilder.group({});
        this.groupArrayForm.insert(0, itemGroup);

        if (isItDirty) {
            itemGroup.markAsDirty();
        }
    }

    /* ************** Methods called from the template ************** */

    /**
     * Remove an item.  Originally it was removed from the list.  However we now want to track deletes so
     * keep it and mark as deleted using change tracking.
     */
    public removeItem(index: number, reason: string) {
        let date: string = MiscUtils.getUTCDateTime();
        let item: T = this.getItemsCollection()[index];
        item.setDateDeleted(date);
        item.setDeletedReason(reason);
        if (this.groupArrayForm.length > index) {
            let formGroup: FormGroup = <FormGroup>this.groupArrayForm.at(index);
            if (formGroup.controls['dateDeleted']) {
                formGroup.controls['dateDeleted'].setValue(date);
            }
            if (formGroup.controls['deletedReason']) {
                formGroup.controls['deletedReason'].setValue(reason);
            }
        }
    }

    /**
     * Delete a newly added item (ie cancel adding the item).
     *
     * @param {string} itemIndex - the index of the new item to be cancelled.
     */
    public cancelNew(itemIndex: number) {
        if (this.itemProperties.length > (itemIndex + 1) && !this.currentItemAlreadyHasEndDate) {
            this.itemProperties[itemIndex+1].setEndDate('');
            let formGroup: FormGroup = <FormGroup>this.groupArrayForm.at(itemIndex+1);
            if (formGroup.controls['endDate']) {
                formGroup.controls['endDate'].setValue('');
                formGroup.controls['endDate'].markAsPristine();
            }
        }

        (<FormGroup>this.groupArrayForm.at(itemIndex)).reset();
        (<FormGroup>this.groupArrayForm.at(itemIndex)).markAsPristine();
        this.itemProperties.splice(itemIndex, 1);
        this.groupArrayForm.controls.splice(itemIndex, 1);
    }

    public isFormDirty(): boolean {
        return this.groupArrayForm ? this.groupArrayForm.dirty : false;
    }

    public isFormInvalid(): boolean {
        return this.groupArrayForm && this.groupArrayForm.invalid;
    }

    /* ************** Private Methods ************** */

    private addNewItem(): void {
        this.isGroupOpen = true;

        if (!this.getItemsCollection()) {
            this.setItemsCollection([]);
        }

        let newItem: T = <T> this.newItemViewModel();
        this.addToItemsCollection(newItem);
        setTimeout(() => {
            let dateUtc: string = MiscUtils.getUTCDateTime();
            this.updateDatesForNewItem(newItem, dateUtc);
            this.updateEndDateForSecondItem(dateUtc);
        });
    }

    private updateDatesForNewItem(item: T, dateUtc: string) {
        let index: number = 0;
        let formGroup: FormGroup = <FormGroup>this.groupArrayForm.at(index);

        item.setStartDate(dateUtc);
        if (formGroup.controls['startDate']) {
            formGroup.controls['startDate'].setValue(dateUtc);
        }

        item.setDateInserted(dateUtc);
        if (formGroup.controls['dateInserted']) {
            formGroup.controls['dateInserted'].setValue(dateUtc);
        }

    }

    /**
     * Update EndDate field for the second item which was the current one before adding a new item.
     *
     * @param datetime: the datetime string to be set for EndDate
     */
    private updateEndDateForSecondItem(dateUtc: string) {
        let index: number = 1;
        if (this.itemProperties.length > 1 && this.itemProperties[index].hasEndDateField() ) {
            if (this.itemProperties[index].endDate) {
                this.currentItemAlreadyHasEndDate = true;
            }
            this.itemProperties[index].setEndDate(dateUtc);
            let formGroup: FormGroup = <FormGroup>this.groupArrayForm.at(index);
            if (formGroup.controls['endDate']) {
                formGroup.controls['endDate'].setValue(dateUtc);
                formGroup.controls['endDate'].markAsDirty();
            }
        }
    }

    /**
     * Use the Geodesy object defined comparator in compare() to sort the given collection inline.
     *
     * @param collection
     */
    private sortUsingComparator(collection: any[]) {
        collection.sort(AbstractGroupComponent.compare);
    }

    private isntDeleted(item: T): boolean {
        return (!item.dateDeleted || item.dateDeleted.length === 0);
    }

    /**
     * After a new item is created 'EventNames.newItem' is sent so that item can init itself.
     */
    private newItemEvent() {
        let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
        geodesyEvent.name = EventNames.newItem;
        geodesyEvent.valueNumber = 0;
    }

    /**
     * Toggle the group (open or close it)
     * TODO move this up into abstract base component and consolidate naming of
     * the group "isGroupOpen" and the item "isOpen" which mean the same thing
     */
    private toggleGroup(event: UIEvent) {
        event.preventDefault();
        this.isGroupOpen = this.miscUtils.scrollIntoView(event, this.isGroupOpen);
    }
}
