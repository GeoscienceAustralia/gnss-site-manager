import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
    moduleId: module.id,
    selector: 'frequency-standard-item',
    templateUrl: 'frequency-standard-item.component.html',
})
export class FrequencyStandardItemComponent extends AbstractItemComponent {
    /**
     * The Frequency Standard in question.
     */
    @Input() frequencyStandard: FrequencyStandardViewModel;

    constructor(protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Frequency Standard';
    }

    getItem(): AbstractViewModel {
        return this.frequencyStandard;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            standardType: ['', [Validators.maxLength(200)]],
            inputFrequency: ['', [Validators.maxLength(25)]],
            startDate: [''],
            endDate: [''],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
