import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Surveyed Local Tie.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-tie-item',
    templateUrl: 'surveyed-local-tie-item.component.html',
})
export class SurveyedLocalTieItemComponent extends AbstractItemComponent {

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            tiedMarkerName: ['', [Validators.maxLength(50)]],
            tiedMarkerUsage: ['', [Validators.maxLength(50)]],
            tiedMarkerCDPNumber: ['', [Validators.maxLength(25)]],
            tiedMarkerDOMESNumber: ['', [Validators.maxLength(25)]],
            dx: ['', [Validators.maxLength(25)]],
            dy: ['', [Validators.maxLength(25)]],
            dz: ['', [Validators.maxLength(25)]],
            surveyMethod: ['', [Validators.maxLength(50)]],
            localSiteTiesAccuracy: ['', [Validators.maxLength(50)]],
            startDate: [''],
            // TODO see GEOD-454 endDate not needed by this component but the value exists in the model
            endDate: [''],
            notes: [['', [Validators.maxLength(2000)]]],
            objectMap: [''],
        });
    }
}
