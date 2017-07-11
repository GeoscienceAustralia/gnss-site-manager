import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { PressureSensorViewModel } from './pressure-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Pressure Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'pressure-sensor-item',
    templateUrl: 'pressure-sensor-item.component.html',
})
export class PressureSensorItemComponent extends AbstractItemComponent {

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            manufacturer: ['', [Validators.required, Validators.maxLength(100)]],
            serialNumber: ['', [Validators.required, Validators.maxLength(100)]],
            dataSamplingInterval: ['', [Validators.maxLength(25)]],
            accuracyHPa: ['', [Validators.maxLength(25)]],
            heightDiffToAntenna: ['', [Validators.maxLength(25)]],
            calibrationDate: [''],
            startDate: [''],
            endDate: [''],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
