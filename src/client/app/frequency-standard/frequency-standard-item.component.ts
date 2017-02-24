import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AbstractItem} from '../shared/abstract-groups-items/abstract-item';
import {GeodesyEvent} from '../shared/events-messages/Event';
import {FrequencyStandardViewModel} from './frequency-standard-view-model';
import {MiscUtils} from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';
import {SiteLogService} from '../shared/site-log/site-log.service';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
  moduleId: module.id,
  selector: 'frequency-standard-item',
  templateUrl: 'frequency-standard-item.component.html',
})
export class FrequencyStandardItemComponent extends AbstractItem {
  public miscUtils: any = MiscUtils;

  /**
   * Total number of Frequency Standards
   */
  @Input() total: number;

  /**
   * The index of this Frequency Standard (zero-based)
   */
  @Input() index: number;

  /**
   * The Frequency Standard in question.
   */
  @Input() frequencyStandard: FrequencyStandardViewModel;

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

  constructor(protected dialogService: DialogService, protected siteLogService: SiteLogService) {
      super(dialogService, siteLogService);
  }

  getGeodesyEvent(): GeodesyEvent {
    return this.geodesyEvent;
  }

  getIndex(): number {
    return this.index;
  }

  getReturnEvents(): EventEmitter<GeodesyEvent> {
    return this.returnEvents;
  }

  getItemName(): string {
    return 'Frequency Standard';
  }
}
