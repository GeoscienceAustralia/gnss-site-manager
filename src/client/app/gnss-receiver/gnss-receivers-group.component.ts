import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { SiteLogService } from '../shared/http-request/site-log.service';

/**.
 * This class represents a group of GNSS Receivers.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receivers-group',
    templateUrl: 'gnss-receivers-group.component.html',
})
export class GnssReceiversGroupComponent extends AbstractGroupComponent<GnssReceiverViewModel> {
    constructor(protected siteLogService: SiteLogService, protected formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }

    getControlName(): string {
        return 'gnssReceivers';
    }

    /* **************************************************
     * Other methods
     */
    getNewItemViewModel(): GnssReceiverViewModel {
        return new GnssReceiverViewModel();
    }
}
