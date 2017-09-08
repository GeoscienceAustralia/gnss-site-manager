import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Temperature Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensor-item',
    templateUrl: 'temperature-sensor-item.component.html',
})
export class TemperatureSensorItemComponent extends AbstractItemComponent {
    /**
     * The TemperatureSensor in question.
     */
    @Input() temperatureSensor: TemperatureSensorViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Temperature Sensor';
    }

    getItem(): AbstractViewModel {
        return this.temperatureSensor;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            type: ['', [Validators.required, Validators.maxLength(100)]],
            manufacturer: [' ', [Validators.required, Validators.maxLength(100)]],
            serialNumber: [' ', [Validators.maxLength(100)]],
            dataSamplingInterval: [''],
            accuracy: [''],
            heightDiffToAntenna: [''],
            aspiration: ['', [Validators.maxLength(100)]],
            calibrationDate: [''],
            startDate: [''],
            endDate: [''],
            notes: [['', [Validators.maxLength(2000)]]],
            objectMap: [''],
        });
    }
}
