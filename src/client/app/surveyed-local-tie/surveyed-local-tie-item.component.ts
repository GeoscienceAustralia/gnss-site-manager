import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AbstractItem} from '../shared/abstract-groups-items/abstract-item';
import {GeodesyEvent} from '../shared/events-messages/Event';
import {SurveyedLocalTieViewModel} from './surveyed-local-tie-view-model';
import {MiscUtils} from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';
import {SiteLogService} from '../shared/site-log/site-log.service';

/**
 * This component represents a single Surveyed Local Tie.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-tie-item',
    templateUrl: 'surveyed-local-tie-item.component.html',
})
export class SurveyedLocalTieItemComponent extends AbstractItem {
    public miscUtils: any = MiscUtils;

    /**
     * Total number of surveyedLocalTies
     */
    @Input() total: number;
    /**
     * The index of this sensor (zero-based)
     */
    @Input() index: number;
    /**
     * The SurveyedLocalTie in question.
     */
    @Input() surveyedLocalTie: SurveyedLocalTieViewModel;

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
        return 'Surveyed Local Tie';
    }
}
