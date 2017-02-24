import { GeodesyEvent, EventNames } from '../events-messages/Event';
import {EventEmitter, DoCheck, OnInit, OnDestroy} from '@angular/core';
import { DialogService } from '../index';
import {SiteLogService} from '../site-log/site-log.service';
import {Subscription} from 'rxjs';

export abstract class AbstractItem implements DoCheck, OnInit, OnDestroy {
    private subscription: Subscription;

    protected isNew: boolean = false;

    protected isOpen: boolean = false;

    /**
     * Keep a copy of the last GeodesyEvent so can detect when it has changed nad have a new event.
     *
     * @type {{name: EventNames}}
     */
    private lastGeodesyEvent: GeodesyEvent = {name: EventNames.none};


    /**
     * Get the (@Output) GeodesyEvent used to communicate from parent to child.
     */
    abstract getGeodesyEvent(): GeodesyEvent;

    /**
     * Get the index of the item.
     */
    abstract getIndex(): number;

    /**
     * Get the @Output returnEvents endpoint for the child to send events to the parent
     */
    abstract getReturnEvents(): EventEmitter<GeodesyEvent>;

    /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

  /**
   * Creates an instance of the AbstractItem with the injected Services.
   *
   * @param {DialogService} dialogService - The injected DialogService.
   */
    constructor(protected dialogService: DialogService, protected siteLogService: SiteLogService) {
      this.setupSubscriptions();
    }

    private setupSubscriptions() {
        this.subscription = this.siteLogService.getSavedSubscription().subscribe(saved => {
            console.log('Abstract item for '+ this.getItemName() + ' - isNew: '+ this.isNew +', changed to false');
            this.isNew = false;
        });
    }

    ngOnInit() {
        this.isOpen = this.getIndex() === 0 ? true : false;
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
    /**
     * Angular doesn't detect changes in objects and need to perform the check with this lifecycle hook ourselves.
     *
     * We use it to receive events / messages from the parent component
     */
    ngDoCheck(): void {
        this.detectHandleGeodesyEvents();
    }

    detectHandleGeodesyEvents() {
        if (this.getGeodesyEvent().name !== this.lastGeodesyEvent.name) {
            this.copyEventToLast();
            console.log('child event: ', EventNames[this.getGeodesyEvent().name]);
            switch (this.getGeodesyEvent().name) {
                case EventNames.newItem:
                    this.newItem(this.getGeodesyEvent().valueNumber);
                    break;

                default:
                    console.log('Child component - unhandled event: ', EventNames[this.getGeodesyEvent().name]);
            }
        }
    }

    /**
     * Event Handler - if this item has the given indexOfNew, then this is a new item.
     *
     * @param indexOfNew
     */
    private newItem(indexOfNew: number) {
        if (this.getIndex() === indexOfNew) {
            this.isNew = true;
            this.isOpen = true;
        }
    }

    /**
     * Keep a lastGeodesyEvent so can see in ngDoCheck() if the event has changed
     */
    private copyEventToLast() {
        this.lastGeodesyEvent.name = this.getGeodesyEvent().name;
        this.lastGeodesyEvent.valueNumber = this.getGeodesyEvent().valueNumber;
        this.lastGeodesyEvent.valueObject = this.getGeodesyEvent().valueObject;
        this.lastGeodesyEvent.valueString = this.getGeodesyEvent().valueString;
    }

    /**
     * Remove an item from the UI and delete if it is an existing record.
     */
    removeItem(index: number) {

      let deleteReason: string = 'New item not needed';

      if (this.isNew) {
        this.cancelNew(index, deleteReason);
      } else {
          this.dialogService.confirmDeleteDialog(
            this.getItemName(),
            (deleteReason : string) => {
               // ok callback
               this.deleteItem(index, deleteReason);
            },
            () => {
              // cancel callback
              console.log('delete cancelled by user');
            }
          );
      }
    }

    /**
     *  Mark an item for deletion using the specified reason.
     */
    private deleteItem(index: number, deleteReason : string) {
        console.log('child call removeItem(' + index + ')');
        let geodesyEvent: GeodesyEvent = {name: EventNames.removeItem, valueNumber: index, valueString: deleteReason};
        this.getReturnEvents().emit(geodesyEvent);
    }

    /**
     *  Mark an item for deletion using the specified reason.
     */
    private cancelNew(index: number, deleteReason : string) {
        console.log('child call cancelNew(' + index + ')');
        let geodesyEvent: GeodesyEvent = {name: EventNames.cancelNew, valueNumber: index, valueString: deleteReason};
        this.getReturnEvents().emit(geodesyEvent);
    }

    getRemoveOrDeletedText(): string {
        return this.isNew ? 'cancel' : 'delete';
    }
}
