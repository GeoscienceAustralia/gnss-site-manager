import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Humidity Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensor-item',
    templateUrl: 'humidity-sensor-item.component.html',
})
export class HumiditySensorItemComponent extends AbstractItemComponent {
    /**
     * The HumiditySensor in question.
     */
    @Input() humiditySensor: HumiditySensorViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    getItem(): AbstractViewModel {
        return this.humiditySensor;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            type: [''],
            manufacturer: [''],
            serialNumber: [''],
            dataSamplingInterval: ['', [Validators.maxLength(25)]],
            accuracyPercentRelativeHumidity: ['', [Validators.maxLength(25)]],
            aspiration: [''],
            heightDiffToAntenna: ['', [Validators.maxLength(25)]],
            calibrationDate: [''],
            startDate: [''],
            endDate: [''],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
