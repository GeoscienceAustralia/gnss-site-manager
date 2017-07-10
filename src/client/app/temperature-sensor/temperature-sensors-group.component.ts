import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of Temperature Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensors-group',
    templateUrl: '../shared/abstract-groups-items/abstract-group.component.html',
})
export class TemperatureSensorsGroupComponent extends AbstractGroupComponent<TemperatureSensorViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Temperature Sensor';
    }

    getControlName(): string {
        return 'temperatureSensors';
    }

    getNewItemViewModel(): TemperatureSensorViewModel {
        return new TemperatureSensorViewModel();
    }
}
