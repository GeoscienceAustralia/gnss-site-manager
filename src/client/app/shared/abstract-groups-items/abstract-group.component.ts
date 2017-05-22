import { Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AbstractBaseComponent } from './abstract-base.component';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../global/misc-utils';
import * as lodash from 'lodash';

export const newItemShouldBeBlank: boolean = true;

export abstract class AbstractGroupComponent<T extends AbstractViewModel> extends AbstractBaseComponent {
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
           this.setupForm(this.getControlName());
       }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(this.getFormData(originalSiteLogModel));
        }
    }

    /**
     * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
     * @type {{name: EventNames}}
     */
    private geodesyEvent: GeodesyEvent = new GeodesyEvent(EventNames.none);

    /**
     * All the items.  They are stored in ascending order so that the oldest items are 'left-most' in the array, just like
     * in the itemOriginalProperties so that differences work to show the new items added.  The sorting field is determined
     * through the abstract method compare(left, right)).
     *
     * The display order on the form is in reverse with the oldest items at the bottom.  This is achieved with the method
     * getItemsCollection().
     *
     */
    private itemProperties: T[];

    /**
     * A backup of the original list of items.  Used to diff against upon Save.
     */
    private itemOriginalProperties: T[];

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

    constructor(protected formBuilder: FormBuilder) {
        super();
    }

    /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

    abstract getControlName(): string;

    /**
     * The child class needs to define this to make an instance of itself.
     * @param blank - if to exclude all default values so it is completely blank.  Defaults to false.
     */
    abstract newItemViewModel(blank?: boolean): T;

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
     * Return collection - optionally with deleted items filter out.  Always in reverse order.  IT WILL NOT
     * change the original collection's order or composition.
     * @param showDeleted - false by default
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

    getItemsOriginalCollection(): T[] {
        return this.itemOriginalProperties;
    }

    setItemsCollection(itemProperties: T[]) {
        this.itemProperties = itemProperties;
        if (itemProperties && itemProperties.length > 0) {
            this.sortUsingComparator(this.itemProperties);
        }
    }

    setItemsOriginalCollection(itemProperties: T[]) {
        this.itemOriginalProperties = itemProperties;
        if (itemProperties && itemProperties.length > 0) {
            this.sortUsingComparator(this.itemOriginalProperties);
        }
    }

    /**
     * @param item
     * @param origItem
     *
     * @return index in itemProperties (and FormArray) where item is inserted
     */
    addToItemsCollection(item: T, origItem: T) {
        this.itemProperties.splice(0, 0, item);
        this.itemOriginalProperties.splice(0, 0, origItem);

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
        this.setupChildItems();
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
    public removeItem(itemIndex: number, reason: string) {
        // Be aware that the default order is one way (low to high start date), but what is displayed is the opposite
        // (high to low start date).  This call is coming from the UI (the display order) and the default for
        // getItemsCollection() is the reverse order so this works out ok
        this.setDeletedReason(itemIndex, reason);
        this.setDeleted(itemIndex);
    }

    /**
     * Delete a newly added item (ie cancel adding the item).
     * @param {string} reason - ignored.
     */
    public cancelNew(itemIndex: number) {
        if (!this.currentItemAlreadyHasEndDate) {
            let updatedValue = this.itemProperties[itemIndex+1].unsetEndDate();
            let formGroup: FormGroup = <FormGroup>this.groupArrayForm.at(itemIndex+1);
            this.updateFormControl(itemIndex+1, 'endDate', '');
            formGroup.patchValue(updatedValue);
            (<FormGroup>this.groupArrayForm.at(itemIndex+1)).controls['endDate'].markAsPristine();
        }
        this.itemProperties.splice(itemIndex, 1);
        this.itemOriginalProperties.splice(itemIndex, 1);
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
        let newItemOrig: T = this.newItemViewModel(newItemShouldBeBlank);

        this.addToItemsCollection(newItem, newItemOrig);
        this.setInserted(0, newItem);

        if (this.itemProperties.length > 1) {
            this.updateSecondToLastItem();
        }

        // Let the parent form know that it now has a new child
        this.groupArrayForm.markAsDirty();
    }

    /**
     * Let the ViewModels do anything they like with the 2nd last (previous) item - such as set end/removal date.
     * Need to modify both the SiteLogModel and the form model.
     */
    private updateSecondToLastItem() {

        let index: number = 1;

        if (this.itemProperties[index].hasEndDateField() ) {

            let updatedValue: Object;

            // check the truthiness of the proposition that the existing record was already end-dated
            if (this.itemProperties[index].endDate) {
                this.currentItemAlreadyHasEndDate = true;
            }
            updatedValue = this.itemProperties[index].setEndDateToCurrentDate();
            if (updatedValue && Object.keys(updatedValue).length > 0) {
                let formGroup: FormGroup = <FormGroup>this.groupArrayForm.at(index);
                formGroup.patchValue(updatedValue);
                formGroup.markAsDirty();
                // If the Group hasn't been opened, no form controls will exist.  It is unusual for users to create a new Item without
                // looking at whatever normally exists.  If not opened then the modified fields won't get marked as dirty.
                // It this is a problem then we could create the form controls.
                if (Object.keys(formGroup.controls).length > 0) {
                    for (let key of Object.keys(updatedValue)) {
                        (<FormGroup>this.groupArrayForm.at(index)).controls[key].markAsDirty();
                    }
                }
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

    private setDeleted(index: number) {
        let item: T = this.getItemsCollection()[index];

        let date: string = item.setDateDeleted();
        this.updateFormControl(index, 'dateDeleted', date);
    }

    private setInserted(index: number, item: T) {
        let date: string = item.setDateInserted();
        this.updateFormControl(index, 'dateInserted', date);
    }

    private setDeletedReason(index: number, reason: string) {
        let item: T = this.getItemsCollection()[index];
        item.setDeletedReason(reason);
        this.updateFormControl(index, 'deletedReason', reason);
    }

    private updateFormControl(index: number, field: string, value: string) {
        if (this.groupArrayForm.length > index) {
            let formGroup: FormGroup = <FormGroup>this.groupArrayForm.at(index);
            if (formGroup.controls[field]) {
                formGroup.controls[field].setValue(value);
            }
        }
    }
}
