import { Input, OnInit, AfterViewInit, OnChanges, SimpleChange, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AbstractBaseComponent } from './abstract-base.component';
import { AbstractItemComponent } from './abstract-item.component';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { SiteLogViewModel }  from '../../site-log/site-log-view-model';
import { MiscUtils } from '../global/misc-utils';
import * as _ from 'lodash';
import { SiteLogService } from '../site-log/site-log.service';

export const newItemShouldBeBlank: boolean = true;

export abstract class AbstractGroupComponent<T extends AbstractViewModel>
    extends AbstractBaseComponent
    implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    isGroupOpen: boolean = false;

    // flag to indicate that the current or latest item in a group has an end date set
    currentItemAlreadyHasEndDate: boolean = false;

    miscUtils: any = MiscUtils;

    @Input() parentForm: FormArray;
    @Input('siteLogModel') siteLogModel: SiteLogViewModel;

    @ViewChildren('item') itemComponents: QueryList<AbstractItemComponent>;

    private subscriptions: Subscription[] = [];

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
     * getItems().
     *
     */
    private items: T[] = [];

    public static compare(obj1: AbstractViewModel, obj2: AbstractViewModel): number {
        return AbstractGroupComponent.compareDates(obj1.startDate, obj2.startDate);
    }

    /**
     * This is used in comparators but isn't a comparator - just a helper function.  In the comparator, extract the dates
     * (using getDateInstalled(), getBeginPositionDate(), ...) and return compareDates(date1, date2)
     * @param date1
     * @param date2
     * @param sortAscending - true if to sort ascendingly.  false by default.
     * @return -1: date1 < date2; 1: date1 > date2; 0: date1 == date2 if descending or 1: date1 < date2; -1: date1 > date2 if ascending
     */
    public static compareDates(date1: string, date2: string, sortAscending: boolean = false): number {
        let sortModifier: number = sortAscending ? 1 : -1;
        if (date1 < date2) {
            return -1 * sortModifier;
        } else if (date1 > date2) {
            return 1 * sortModifier;
        } else {
            return 0;
        }
    }

    constructor(protected siteLogService: SiteLogService,  protected formBuilder: FormBuilder) {
        super(siteLogService);
    }

    ngOnInit() {
        this.setupForm();
    }

    ngAfterViewInit() {
        if (this.allowOneCurrentItem()) {
            setTimeout(() => {
                const components = this.itemComponents.toArray();

                for (let i = 0; i < components.length - 1; i++) {
                    let current = components[i];
                    let next = components[i + 1];

                    if (current.itemGroup.controls.startDate) {
                        let subscription: Subscription = current.itemGroup.controls.startDate.valueChanges.subscribe(date => {
                            if (date !== current.itemGroup.value['startDate']) {
                                this.updateEndDate(next, date, { overwrite: true });
                            }
                        });
                        this.subscriptions.push(subscription);
                    }
                };
            });
        }
    }

    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        if (changes['siteLogModel'] && !changes['siteLogModel'].isFirstChange()) {
            this.setupForm();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

    abstract getControlName(): string;

    abstract getNewItemViewModel(): T;

    /**
     * Returns the element name in kebab case converted from item name.
     *
     * Eg., "Site Owner" -> "site-owner"
     */
    getElementName(): string {
        let itemName: string = this.getItemName();
        return !itemName ? '' : _.kebabCase(itemName);
    }

    /**
     * Can this group contain only one current item or multiple current itmes?
     */
    protected allowOneCurrentItem(): boolean {
        return true;
    }

    getFormData(): any {
        return this.siteLogModel[this.getControlName()];
    }

    /**
     * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
     *
     * @returns {GeodesyEvent}
     */
    getGeodesyEvent(): GeodesyEvent {
        return this.geodesyEvent;
    }

    /**
     * Return collection.
     * @return {T[]}
     */
    getItems(): T[] {
        return this.items;
    }

    hasItems(): boolean {
        return !_.isEmpty(this.items);
    }

    setItems(items: T[]) {
        if (items) {
            items.forEach((element: T, i: number) => {
                element.id = i;
            });
            this.items = _.filter(items, item => !item.dateDeleted);
            this.items.sort(AbstractGroupComponent.compare);
            this.items.forEach(() => {
                this.parentForm.insert(0, new FormGroup({}));
            });
        }
    }

    /**
     * @param item
     * @param origItem
     *
     * @return index in items (and FormArray) where item is inserted
     */
    addToItems(item: T) {
        this.items.splice(0, 0, item);
        this.parentForm.insert(0, new FormGroup({}));
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
    setupForm() {
        while (this.parentForm.length) {
            this.parentForm.removeAt(0);
        }
        this.setItems(this.getFormData());
    }

    /* ************** Methods called from the template ************** */

    /**
     * Remove an item.  Originally it was removed from the list.  However we now want to track deletes so
     * keep it and mark as deleted using change tracking.
     */
    public removeItem(index: number, reason: string) {
        let date: string = MiscUtils.getUTCDateTime();
        let item: T = this.getItems()[index];
        item.dateDeleted = date;
        item.deletedReason = reason;
        item.isDeleted = true;
    }

    /**
     * Delete a newly added item (ie cancel adding the item).
     *
     * @param {string} itemIndex - the index of the new item to be cancelled.
     */
    public cancelNew(itemIndex: number) {
        if (this.items.length > (itemIndex + 1) && !this.currentItemAlreadyHasEndDate) {
            this.items[itemIndex+1].endDate = '';
            let formGroup: FormGroup = <FormGroup>this.parentForm.at(itemIndex+1);
            if (formGroup.controls['endDate']) {
                formGroup.controls['endDate'].setValue('');
                formGroup.controls['endDate'].markAsPristine();
            }
        }

        (<FormGroup>this.parentForm.at(itemIndex)).markAsPristine();
        this.items.splice(itemIndex, 1);
        this.parentForm.removeAt(itemIndex);
    }

    public isFormDirty(): boolean {
        return this.parentForm && this.parentForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.parentForm && this.parentForm.invalid;
    }

    /**
     * Toggle the group (open or close it)
     */
    public toggleGroup(event: UIEvent) {
        event.preventDefault();
        this.isGroupOpen = this.miscUtils.scrollIntoView(event, this.isGroupOpen);
    }

    /**
     * Do items in this group have end dates?
     */
    // TODO: Ideally, there should be different subclasses of (all of, or some of) AbstractViewModel,
    // AbstractItemComponent, and AbstractGroupComponent to denote cases where change management applies.
    protected hasEndDateField(): boolean {
        return true;
    }

    /* ************** Private Methods ************** */

    private addNewItem(): void {
        this.isGroupOpen = true;

        let newItem: T = <T> this.getNewItemViewModel();
        this.addToItems(newItem);
        setTimeout(() => {
            let dateUtc: string = MiscUtils.getUTCDateTime();
            this.updateDatesForNewItem(newItem, dateUtc);
            if (this.allowOneCurrentItem()) {
                this.updateEndDateForSecondItem(dateUtc);
            }
        });
    }

    private updateDatesForNewItem(item: T, dateUtc: string) {
        let index: number = 0;
        let formGroup: FormGroup = <FormGroup>this.parentForm.at(index);

        item.startDate = dateUtc;
        if (formGroup.controls['startDate']) {
            formGroup.controls['startDate'].setValue(dateUtc);
            formGroup.controls['startDate'].markAsDirty();
        }
        item.dateInserted = dateUtc;
    }

    /**
     * Update EndDate field for the second item which was the current one before adding a new item.
     *
     * @param dateUtc: the UTC datetime string to be set to EndDate
     */
    private updateEndDateForSecondItem(date: string) {
        let components = this.itemComponents.toArray();

        if (this.items.length > 1 && this.hasEndDateField()) {
            if (components[1].itemGroup.controls['endDate'].value) {
                this.currentItemAlreadyHasEndDate = true;
            } else {
                this.updateEndDate(components[1], date, { overwrite: false });
                let subscription: Subscription = components[0].itemGroup.controls.startDate.valueChanges.subscribe((date: string) => {
                    this.updateEndDate(components[1], date, { overwrite: true });
                });
                this.subscriptions.push(subscription);
            }
        }
    }

    private updateEndDate(itemComponent: AbstractItemComponent, date: string, flags: { overwrite: boolean }): void {
        let item = itemComponent.itemGroup;
        if (date && item.controls['endDate']) {
            let endDateControl = item.controls.endDate;
            if (!endDateControl.value || flags.overwrite) {
                endDateControl.setValue(date);
                endDateControl.markAsDirty();
            }
        }
    }

    /**
     * After a new item is created 'EventNames.newItem' is sent so that item can init itself.
     */
    private newItemEvent() {
        let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
        geodesyEvent.name = EventNames.newItem;
        geodesyEvent.valueNumber = 0;
    }
}
