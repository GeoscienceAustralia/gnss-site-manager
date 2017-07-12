import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Pressure Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'radio-interference-item',
    templateUrl: 'radio-interference-item.component.html',
})
export class RadioInterferenceItemComponent extends AbstractItemComponent {

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Radio Interference';
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            observedDegradation: ['', [Validators.maxLength(100)]],
            possibleProblemSource: ['', [Validators.maxLength(100)]],
            startDate: [''],
            endDate: [''],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
