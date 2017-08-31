import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/http-request/site-log.service';
import { OtherInstrumentationViewModel } from './other-instrumentation-view-model';

/**
 * This component represents a single other instrumentation log item.
 */
@Component({
    moduleId: module.id,
    selector: 'other-instrumentation-item',
    templateUrl: 'other-instrumentation-item.component.html',
})
export class OtherInstrumentationItemComponent extends AbstractItemComponent {

    @Input() otherInstrumentation: OtherInstrumentationViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Other Instrumentation';
    }

    getItem(): AbstractViewModel {
        return this.otherInstrumentation;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            instrumentation: ['', [Validators.required]],
            startDate: [''],
            endDate: [''],
        });
    }
}
