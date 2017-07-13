import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a collection of GNSS Antenna items.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-group',
    templateUrl: '../shared/abstract-groups-items/abstract-group.component.html',
})
export class GnssAntennaGroupComponent extends AbstractGroupComponent<GnssAntennaViewModel> {

    @ViewChild('gnssAntennaTmpl') gnssAntennaTmpl: TemplateRef<any>;

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    getControlName(): string {
        return 'gnssAntennas';
    }

    getNewItemViewModel(): GnssAntennaViewModel {
        return new GnssAntennaViewModel();
    }

    getTemplate(): TemplateRef<any> {
        return this.gnssAntennaTmpl;
    }
}
