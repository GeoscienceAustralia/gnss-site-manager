import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { PressureSensorViewModel } from './pressure-sensor-view-model';
import { SiteLogService } from '../shared/http-request/site-log.service';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'pressure-sensors-group',
    templateUrl: 'pressure-sensors-group.component.html',
})
export class PressureSensorsGroupComponent extends AbstractGroupComponent<PressureSensorViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    getControlName(): string {
        return 'pressureSensors';
    }

    getNewItemViewModel(): PressureSensorViewModel {
        return new PressureSensorViewModel();
    }
}
