import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**.
 * This class represents a group of Humidity Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensor-group',
    templateUrl: 'humidity-sensor-group.component.html',
})
export class HumiditySensorGroupComponent extends AbstractGroupComponent<HumiditySensorViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    getControlName(): string {
        return 'humiditySensors';
    }

    /* **************************************************
     * Other methods
     */
    getNewItemViewModel(): HumiditySensorViewModel {
        return new HumiditySensorViewModel();
    }
}
