import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { MultipathSourceViewModel } from './multipath-source-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'multipath-source-group',
    templateUrl: '../shared/abstract-groups-items/abstract-group.component.html',
})
export class MultipathSourceGroupComponent extends AbstractGroupComponent<MultipathSourceViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Multipath Source';
    }

    getControlName(): string {
        return 'multipathSources';
    }

    getNewItemViewModel(): MultipathSourceViewModel {
        return new MultipathSourceViewModel();
    }
}
