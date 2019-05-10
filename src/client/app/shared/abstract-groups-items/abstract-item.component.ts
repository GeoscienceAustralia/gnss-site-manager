import { EventEmitter, Input, Output, OnInit, OnChanges, AfterViewInit, SimpleChange, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AbstractBaseComponent } from './abstract-base.component';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { DialogService } from '../index';
import { MiscUtils } from '../global/misc-utils';
import { UserAuthService } from '../global/user-auth.service';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { SiteLogService, ApplicationState, ApplicationSaveState } from '../site-log/site-log.service';

export abstract class AbstractItemComponent extends AbstractBaseComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    protected miscUtils: any = MiscUtils;

    public itemGroup: FormGroup;

    @Input('groupArray') groupArray: FormArray;

    /**
     * The index of this item in `groupArray`
     */
    @Input() index: number;

    /**
     * Total number of items
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
    protected isItemOpen: boolean = false;

    private _isDeleted: boolean = false;
    private subscription: Subscription;

    /**
     * Creates an instance of the AbstractItem with the injected Services.
     *
     * @param {DialogService} dialogService - The injected DialogService.
     */
    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService) {
        super(siteLogService);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.isEditable) {
                this.itemGroup.enable();
            } else {
                this.itemGroup.disable();
            }
        });
    }

    isDeleteDisabled(): boolean {
        return !this.isEditable || this.isDeleted;
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
     * Return the item form with default values and form controls.
     *
     */
    abstract getItemForm(): FormGroup;

    /**
     * Allow items to deal with total number of items change
     */
    protected handleTotalChange(currentValue: number, previousValue: number): void {
    }

    ngOnInit() {
        this.subscription = this.siteLogService.getApplicationState().subscribe((applicationState: ApplicationState) => {
            if (! applicationState.applicationFormModified) {
                this.itemGroup.markAsPristine();
            }
            if (applicationState.applicationSaveState === ApplicationSaveState.saved) {
                this.isNew = false;
            }
        });

        this.setupForm();
    }

    /**
     * set up the item form, insert it into the form array and populate with initial values if any.
     *
     */
    setupForm() {
        this.itemGroup = this.getItemForm();
        this.itemGroup.patchValue(this.getItem());
        this.groupArray.setControl(this.index, this.itemGroup);
    }

    /**
     * Deteect changes in @Inputs and delegate to handlers
     * @param changes sent by the NG Framework
     */
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            if (changedProp.isFirstChange()) {
                if (propName === 'geodesyEvent') {
                    this.handleGeodesyEvents();
                }
            }
            if (propName === 'total') {
                this.handleTotalChange(changedProp.currentValue, changedProp.previousValue);
            }
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscription.unsubscribe();
    }

    handleGeodesyEvents() {
            switch (this.getGeodesyEvent().name) {
                case EventNames.newItem:
                    this.updateNewItemFlags(this.getGeodesyEvent().valueNumber);
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

      if (this.isNew) {
        this.cancelNew(index);
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
        return this.itemGroup && this.itemGroup.dirty;
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

        let startDatetime: any = this.itemGroup.controls.startDate.value;
        let endDatetime: any = this.itemGroup.controls.endDate.value;
        if (!startDatetime && !endDatetime) {
            return '<span>' + this.getItemName() + ' </span>';
        }

        let startDateString: string = MiscUtils.isDate(startDatetime) ? MiscUtils.formatDateToDateString(startDatetime):
                                      MiscUtils.getDateComponent(startDatetime);
        let endDateString: string = MiscUtils.isDate(endDatetime) ? MiscUtils.formatDateToDateString(endDatetime):
                                    MiscUtils.getDateComponent(endDatetime);

        let dateRange: string = startDateString ? startDateString : '?';
        if (endDateString) {
            dateRange += ' &ndash; ' + endDateString;
        } else {
            dateRange = 'Since ' + dateRange;
        }

        return '<span class="hidden-xsm">' + (endDateString ? 'Previous' : 'Current') + ' </span>'
             + '<span class="hidden-xxs">' + this.getItemName() + ' </span>'
             + '<span class="hidden-xxs">(</span>' + dateRange + '<span class="hidden-xxs">)</span>';
    }

    /**
     * Toggle the item (open or close it)
     */
    public toggleItem(event: UIEvent) {
        event.preventDefault();
        this.isItemOpen = this.miscUtils.scrollIntoView(event, this.isItemOpen);
    }

    /**
     *  Mark an item for deletion using the specified reason.
     */
    protected cancelNew(index: number): void {
        let geodesyEvent: GeodesyEvent = {name: EventNames.cancelNew, valueNumber: index};
        this.getReturnEvents().emit(geodesyEvent);
        this.isNew = false;
    }


    /**
     *  Mark an item for deletion using the specified reason.
     */
    protected deleteItem(index: number, deleteReason : string | null): void {
        this.isDeleted = true;
        let geodesyEvent: GeodesyEvent = {name: EventNames.removeItem, valueNumber: index, valueString: deleteReason};
        this.getReturnEvents().emit(geodesyEvent);
        this.itemGroup.disable();
    }


    /**
     * Event Handler - if this item has the given indexOfNew, then update relevant flags for the new item.
     *
     * @param indexOfNew: index of the new item in the item array
     */
    private updateNewItemFlags(indexOfNew: number): void {
        setTimeout(() => {
            if (this.itemGroup) {
                this.itemGroup.markAsDirty();
            }
        });
        if (this.getIndex() === indexOfNew) {
            this.isNew = true;
            this.isItemOpen = true;
        } else {
            // close all others
            this.isNew = false;
            this.isItemOpen = false;
        }
    }
}
