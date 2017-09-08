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
    /**
     * The PressureSensor in question.
     */
    @Input() pressureSensor: PressureSensorViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    getItem(): AbstractViewModel {
        return this.pressureSensor;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            type: ['', [Validators.required, Validators.maxLength(100)]],
            manufacturer: ['', [Validators.required, Validators.maxLength(100)]],
            serialNumber: ['', [Validators.maxLength(100)]],
            dataSamplingInterval: [''],
            accuracy: [''],
            heightDiffToAntenna: [''],
            calibrationDate: [''],
            startDate: [''],
            endDate: [''],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
