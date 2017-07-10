import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { RadioInterferenceViewModel } from './radio-interference-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'radio-interferences-group',
    templateUrl: '../shared/abstract-groups-items/abstract-group.component.html',
})
export class RadioInterferenceGroupComponent extends AbstractGroupComponent<RadioInterferenceViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Radio Interference';
    }

    getControlName(): string {
        return 'radioInterferences';
    }

    getNewItemViewModel(): RadioInterferenceViewModel {
        return new RadioInterferenceViewModel();
    }
}
