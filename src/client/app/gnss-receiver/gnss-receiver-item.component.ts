import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AbstractItem} from '../shared/abstract-groups-items/abstract-item';
import {GeodesyEvent} from '../shared/events-messages/Event';
import {GnssReceiverViewModel} from './gnss-receiver-view-model';
import {MiscUtils} from '../shared/global/misc-utils';

/**
 * This class represents a single item of GNSS Receivers.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-receiver-item',
  templateUrl: 'gnss-receiver-item.component.html',
})
export class GnssReceiverItemComponent extends AbstractItem {
  public miscUtils: any = MiscUtils;

  /**
   * Total number of GNSS receivers
   */
  @Input() total: number;

  /**
   * The index of this receiver (zero-based)
   */
  @Input() index: number;

  /**
   * The GNSS Receiver in question.
   */
  @Input() receiver: GnssReceiverViewModel;

  /**
   * This is to receive geodesyEvent from parent.
   */
  @Input() geodesyEvent: GeodesyEvent;

  /**
   * Events children components can send to their parent components.  Usually these are then passed to all
   * child components.
   * @type {EventEmitter<boolean>}
   */
  @Output() returnEvents = new EventEmitter<GeodesyEvent>();

  getGeodesyEvent(): GeodesyEvent {
    return this.geodesyEvent;
  }

  getIndex(): number {
    return this.index;
  }

  getReturnEvents(): EventEmitter<GeodesyEvent> {
    return this.returnEvents;
  }

}
