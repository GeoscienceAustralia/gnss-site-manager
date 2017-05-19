import { EventEmitter, Input, Output, OnInit, OnChanges, AfterViewInit, SimpleChange } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { AbstractBaseComponent } from './abstract-base.component';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { DialogService } from '../index';
import { MiscUtils } from '../global/misc-utils';
import { UserAuthService } from '../global/user-auth.service';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { ServiceLocator } from '../../app.module';

export class ItemControls {
    itemControls: [ItemControl];

    constructor(itemControls: [ItemControl]) {
        this.itemControls = itemControls;
    }
}

export interface ItemControl {
    [name: string]: AbstractControl;
}

export abstract class AbstractItemComponent extends AbstractBaseComponent implements OnInit, OnChanges, AfterViewInit {
    protected miscUtils: any = MiscUtils;

    protected itemGroup: FormGroup;

    @Input('groupArray') groupArray: FormArray;

    /**
     * The index of this item in `groupArray`
     */
    @Input() index: number;

    /**
     * Total number of Frequency Standards
     */
    @Input() total: number;

    /**
     * This is to receive geodesyEvent from parent.
     */
    @Input() geodesyEvent: GeodesyEvent;

    /**
     * Events children components can send to their parent components. Usually these are then passed to all
     * child components.
     * @type {EventEmitter<boolean>}
     */
    @Output() returnEvents = new EventEmitter<GeodesyEvent>();

    protected isNew: boolean = false;
    protected isOpen: boolean = false;

    private _isDeleted: boolean = false;

    /**
     * Creates an instance of the AbstractItem with the injected Services.
     *
     * @param {DialogService} dialogService - The injected DialogService.
     */
    constructor(protected dialogService: DialogService) {
        super();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.isEditable()) {
                this.itemGroup.enable();
            } else {
                this.itemGroup.disable();
            }
        });
    }

    isDeleteDisabled(): boolean {
        return !super.isEditable() || this.isDeleted;
    }

    set isDeleted(f: boolean) {
        this._isDeleted = f;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    /**
     * Get the index of the item.
     */
    getIndex(): number {
        return this.index;
    }

    getGeodesyEvent(): GeodesyEvent {
        return this.geodesyEvent;
    }

    getReturnEvents(): EventEmitter<GeodesyEvent> {
        return this.returnEvents;
    }

    /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

    /**
     * Get the ViewModel used in the Item components
     */
    abstract getItem(): AbstractViewModel;

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    abstract getFormControls(): ItemControls;

    ngOnInit() {
        this.itemGroup = <FormGroup> this.groupArray.at(this.index);
        this.addFields(this.itemGroup, this.getFormControls());
        // Check its dirty status before doing the setValue() and restore to that state afterwards
        let wasDirty: boolean = this.itemGroup ? this.itemGroup.dirty : true;   // True because it is new
        this.itemGroup.setValue(this.getItem());
        if (!wasDirty) {
            setTimeout(() => {
                this.itemGroup.markAsPristine();
            });
        }
    }

    /**
     * Deteect changes in @Inputs and delegate to handlers
     * @param changes sent by the NG Framework
     */
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            if (changedProp.isFirstChange()) {
                if (propName === 'geodesyEvent') {
                    this.handleGeodesyEvents();
                }
            }
        }
    }

    handleGeodesyEvents() {
            switch (this.getGeodesyEvent().name) {
                case EventNames.newItem:
                    this.newItem(this.getGeodesyEvent().valueNumber);
                    break;
                case EventNames.none:
                    break;
                default:
                    console.log('Child component - unhandled event: ', EventNames[this.getGeodesyEvent().name]);
            }
    }

    /**
     * Remove an item from the UI and delete if it is an existing record.
     */
    removeItem(index: number): boolean {
      let deleteReason: string = 'New item not needed';

      if (this.isNew) {
        this.cancelNew(index, deleteReason);
      } else {
          this.dialogService.confirmDeleteDialog(
            this.getItemName(),
            (deleteReason : string) => {  // ok callback
               this.deleteItem(index, deleteReason);
                this.itemGroup.markAsDirty();
            },
            () => {  // cancel callback
              console.log('delete cancelled by user');
            }
          );
      }
      return false; // same as 'event.preventDefault()` (which I'm having trouble as cant get event parameter)
    }

    getRemoveOrDeletedText(): string {
        return this.isNew ? 'Cancel' : 'Delete';
    }

    public isFormDirty(): boolean {
        return this.itemGroup ? (this.itemGroup.dirty || this.isNew) : false;
    }

    public isFormInvalid(): boolean {
        return this.itemGroup && this.itemGroup.invalid;
    }

    /**
     * Return the item header label in HTML format, including item name and date range.
     *
     * @param startDatetime: the start/installed/measured date-time of the item
     * @param endDatetime: the optional end/removed date-time of the item
     */
    public getItemHeaderHtml(): string {

        // TODO - change view model to be exclusively Date and fix this
        let startDatetime: any = this.getItem().startDate;
        let endDatetime: any = this.getItem().endDate;

        let headerHtml: string = '<span class="hidden-xsm">'
                               + (this.getIndex() === 0 ? 'Current' : 'Previous')
                               + ' </span>';

        if (startDatetime) {
            headerHtml += '<span class="hidden-xxs">' + this.getItemName() + ' </span>';
            let dateRange: string = '';
            let startDateString: string = MiscUtils.isDate(startDatetime) ? MiscUtils.formatDateToDateString(startDatetime):
                MiscUtils.getDateComponent(startDatetime);
            if (endDatetime) {
                let endDateString: string = MiscUtils.isDate(endDatetime) ? MiscUtils.formatDateToDateString(endDatetime):
                    MiscUtils.getDateComponent(endDatetime);
                dateRange = startDateString + ' &ndash; ' + endDateString;
            } else {
                dateRange = 'Since ' + startDateString;
            }
            headerHtml += '<span class="hidden-xxs">(</span>' + dateRange + '<span class="hidden-xxs">)</span>';
        } else {
            headerHtml += '<span>' + this.getItemName() + ' </span>';
        }

        return headerHtml;
    }

    /**
     * Event Handler - if this item has the given indexOfNew, then this is a new item.
     *
     * @param indexOfNew
     */
    private newItem(indexOfNew: number): void {
        if (this.getIndex() === indexOfNew) {
            this.isNew = true;
            this.isOpen = true;
        } else {
            // close all others
            this.isNew = false;
            this.isOpen = false;
        }
    }

    /**
     *  Mark an item for deletion using the specified reason.
     */
    private deleteItem(index: number, deleteReason : string): void {
        this.isDeleted = true;
        let geodesyEvent: GeodesyEvent = {name: EventNames.removeItem, valueNumber: index, valueString: deleteReason};
        this.getReturnEvents().emit(geodesyEvent);
        this.itemGroup.disable();
    }

    /**
     *  Mark an item for deletion using the specified reason.
     */
    private cancelNew(index: number, deleteReason : string): void {
        let geodesyEvent: GeodesyEvent = {name: EventNames.cancelNew, valueNumber: index, valueString: deleteReason};
        this.getReturnEvents().emit(geodesyEvent);
        this.isNew = false;
    }

    /**
     * When the group is setup, blank FormGroups for the contained Items are created (no controsl).  This method populates the
     * Item's FormGroup with the controls (typically before patching in values).
     *
     * @param itemGroup is the container for the Item's form controls.  It may or may not already contain Form AbstractControls.
     * @param formControls is an array of objects containing the forms AbstractControls to add to the itemGroup.
     */
    private addFields(itemGroup: FormGroup, formControls: ItemControls): void {
        if (Object.keys(this.itemGroup.controls).length === 0) {
            for (let control of formControls.itemControls) {
                let key: any = Object.keys(control)[0];
                let value: AbstractControl = control[key];
                itemGroup.addControl(key, value);
            }
        }
    }
}
