import { Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../global/misc-utils';
import * as lodash from 'lodash';
import { SiteLogViewModel } from '../json-data-view-model/view-model/site-log-view-model';

export const sortingDirectionAscending: boolean = false;
export const newItemShouldBeBlank: boolean = true;
export const notBlankNewItem: boolean = false;

export abstract class AbstractGroup<T extends AbstractViewModel> {
    isGroupOpen: boolean = false;
    hasGroupANewItem: boolean = false;

    miscUtils: any = MiscUtils;
    protected groupArrayForm: FormArray;
    @Input('siteInfoForm') siteInfoForm: FormGroup;


    /**
     * If this group can contain unlimited number of Items.  If its true then there will be a 'new' button (maybe more).
     * It is true by default.
     */
    protected _unlimitedItemsAllowed: boolean = true;

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

    /**
     * This is used in comparators but isn't a comparator - just a helper function.  In the comparator, extract the dates
     * (using getDateInstalled(), getBeginPositionDate(), ...) and return compareDates(date1, date2)
     * @param date1
     * @param date2
     * @param sortAscending - true if to sort ascendingly.  Const sortingDirectionAscending by default.
     * @return -1: date1 < date2; 1: date1 > date2; 0: date1 == date2 if descending or 1: date1 < date2; -1: date1 > date2 if ascending
     */
    public static compareDates(date1: string, date2: string, sortAscending: boolean = sortingDirectionAscending): number {
        let sortModifier: number = sortAscending ? 1 : -1;
        if (date1 < date2) {
            return -1 * sortModifier;
        } else if (date1 > date2) {
            return 1 * sortModifier;
        } else {
            return 0;
        }
    }

    set unlimitedItems(unlimitedItemsAllowed: boolean) {
        this._unlimitedItemsAllowed = unlimitedItemsAllowed;
    }

    get unlimitedItems(): boolean {
        return this._unlimitedItemsAllowed;
    }

    isUnlimitedItemsAllowed(): boolean {
        return this.unlimitedItems;
    }

     /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

    /**
     * The child class needs to define this to make an instance of itself.
     * @param blank - if to exclude all default values so it is completely blank.  Defaults to false.
     */
    abstract newViewModelItem(blank?: boolean): T;

    /**
     * Subclasses can create a comparator relevant for their data structures.  Reduce size in these by
     * using getDateInstalled(), getBeginPositionDate.
     *
     * @param obj1
     * @param obj2
     */
    abstract compare(obj1: AbstractViewModel, obj2: AbstractViewModel): number;

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

    getHasGroupANewItem(): boolean {
        return this.hasGroupANewItem;
    }

    /**
     * Return collection - optionally with deleted items filter out.  Always in reverse order.  IT WILL NOT
     * change the original collection's order or composition.
     * @param showDeleted - false by default
     * @return {T[]}
     */
    getItemsCollection(showDeleted?: boolean): T[] {
        let doShowDeleted: boolean = true;
        // if (this.getItemName().match(/receiver/i)) {
        //     let size: number = this.itemProperties ? this.itemProperties.length : -1;
        //     console.debug(`getItemsCollection for ` + this.getItemName() + ` (size: ${this.itemProperties ? this.itemProperties.length : 0}): `, this.itemProperties);
        // }
        if (showDeleted !== undefined) {
            doShowDeleted = showDeleted;
        }

        if (this.itemProperties) {
            let filteredOrNot: T[] = doShowDeleted ? lodash.clone(this.itemProperties) : this.itemProperties.filter(this.isntDeleted);
            //let reversed: T[] = filteredOrNot.reverse();
            return filteredOrNot;
        } else {
            return [];
        }
    }

    isEmptyCollection(): boolean {
        return (! this.itemProperties || this.itemProperties.length === 0);
    }

    getItemsOriginalCollection(): T[] {
        return this.itemOriginalProperties;
    }

    setItemsCollection(itemProperties: T[]) {
        this.itemProperties = itemProperties;
        if (itemProperties && itemProperties.length > 0) {
            this.sortUsingComparator(this.itemProperties);
        }
        console.debug(this.getItemName() + ' Collection sorted:', this.itemProperties);
    }

    setItemsOriginalCollection(itemProperties: T[]) {
        this.itemOriginalProperties = itemProperties;
        if (itemProperties && itemProperties.length > 0) {
            this.sortUsingComparator(this.itemOriginalProperties);
        }
    }

    addToItemsCollection(item: T, origItem: T) {
        // If the data is stored ascendingly (see AbstractGroup / compareDates() then use push() to append the next item.
        // If the data is stored descendingly (see AbstractGroup / compareDates() then use splice(0, 0) to prepend the next item.
        if (sortingDirectionAscending) {
            this.itemProperties.push(item);
            this.itemOriginalProperties.push(origItem);
        } else {
            this.itemProperties.splice(0, 0, item);
            this.itemOriginalProperties.splice(0,0,origItem);
        }
        console.log('addToItemsCollection - itemProperties: ', this.itemProperties);
        console.log('addToItemsCollection - itemOriginalProperties: ', this.itemOriginalProperties);
    }

    /**
     * This is the event handler called by children
     * @param geodesyEvent
     */
    returnEvents(geodesyEvent: GeodesyEvent) {
        console.log('Parent - returnEvent: ', geodesyEvent);

        switch (geodesyEvent.name) {
            case EventNames.removeItem:
                this.removeItem(geodesyEvent.valueNumber, geodesyEvent.valueString);
                break;
            case EventNames.cancelNew:
                this.cancelNew(geodesyEvent.valueNumber, geodesyEvent.valueString);
                break;
            default:
                console.log('returnEvents - unknown event: ', EventNames[geodesyEvent.name]);
        }
    }

    addNew(event: UIEvent) {
        event.preventDefault();
        this.addNewItem();
        this.newItemEvent();
        console.log('itemProperties at end of addNew: ', this.itemProperties);
    }

    /**
     * Remove an item.  Originally it was removed from the list.  However we now want to track deletes so
     * keep it and mark as deleted using change tracking.
     */
    public removeItem(itemIndex: number, reason: string) {
        console.log('parent - remove item: ', itemIndex);
        // Be aware that the default order is one way (low to high start date), but what is displayed is the opposite
        // (high to low start date).  This call is coming from the UI (the display order) and the default for
        // getItemsCollection() is the reverse order so this works out ok
        this.setDeletedReason(this.getItemsCollection()[itemIndex], reason);
        this.setDeleted(this.getItemsCollection()[itemIndex]);
    }

    /**
     * Permanently Remove an item.  Typically done when deleting an item just added and not yet persisted.
     */
    public cancelNew(itemIndex: number, reason: string) {
        console.log('parent - remove item Permanently: ', itemIndex);
        // Be aware that the default order is one way (low to high start date), but what is displayed is the opposite
        // (high to low start date).  Thus to access the original dataItems we need to reverse the index.
        let newIndex: number = this.itemProperties.length - itemIndex - 1;
        this.itemProperties.splice(newIndex, 1);
    }

    private addNewItem(): void {
        this.isGroupOpen = true;

        if (!this.getItemsCollection()) {
            this.setItemsCollection([]);
        }

        let newItem: T = <T> this.newViewModelItem();
        let newItemOrig: T = this.newViewModelItem(newItemShouldBeBlank);

        console.log('New View Model: ', newItem);
        console.log('itemProperties before new item: ', this.itemProperties);
        console.log('itemPropertiesOrig before new item: ', this.itemOriginalProperties);

        // Add the new humidity sensor as current one
        this.addToItemsCollection(newItem, newItemOrig);
        this.setInserted(newItem);

        console.log('itemProperties after new item: ', this.itemProperties);

        if (this.itemProperties.length > 1) {
            // Let the ViewModels do anything they like with the previous item - such as set end/removal date
            // If the data is stored ascendingly (see AbstractGroup / compareDates() then use push() to append the next item.
            // If the data is stored descendingly (see AbstractGroup / compareDates() then use splice(0, 0) to prepend the next item.
            if (sortingDirectionAscending) {
                this.itemProperties[this.itemProperties.length - 2].setFinalValuesBeforeCreatingNewItem();
            } else {
                this.itemProperties[1].setFinalValuesBeforeCreatingNewItem();
            }
        }

        // Let the parent form know that it now has a new child
        this.groupArrayForm.markAsDirty();
        this.siteInfoForm.markAsDirty();
        console.log('itemProperties after everythign in addNew: ', this.itemProperties);
        console.log('itemOriginalProperties after everythign in addNew: ', this.itemOriginalProperties);
    }

    /**
     * Use the Geodesy object defined comparator in compare() to sort the given collection inline.
     *
     * @param collection
     */
    private sortUsingComparator(collection: any[]) {
        collection.sort(this.compare);
    }

    private isntDeleted(item: T): boolean {
        return (!item.dateDeleted || item.dateDeleted.length === 0);
    }

    /**
     * After a new item is created 'EventNames.newItem' is sent so that item can init itself.
     */
    private newItemEvent() {
        console.log('parent newItemEvent');
        let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
        geodesyEvent.name = EventNames.newItem;
        geodesyEvent.valueNumber = 0;
    }

    private setDeleted(item: T) {
        item.setDateDeleted();
    }

    private setInserted(item: T) {
        item.setDateInserted();
    }

    private setDeletedReason(item: T, reason: string) {
        item.setDeletedReason(reason);
    }
}
