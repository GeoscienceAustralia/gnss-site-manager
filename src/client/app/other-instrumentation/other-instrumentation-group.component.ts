import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { OtherInstrumentationViewModel } from './other-instrumentation-view-model';
import { SiteLogService } from '../shared/http-request/site-log.service';

/**
 * This class represents a group of other instrumentation log items.
 */
@Component({
    moduleId: module.id,
    selector: 'other-instrumentation-group',
    templateUrl: 'other-instrumentation-group.component.html',
})
export class OtherInstrumentationGroupComponent extends AbstractGroupComponent<OtherInstrumentationViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Other Instrumentation';
    }

    getControlName(): string {
        return 'otherInstrumentation';
    }

    getNewItemViewModel(): OtherInstrumentationViewModel {
        return new OtherInstrumentationViewModel();
    }

    protected allowOneCurrentItem(): boolean {
        return false;
    }
}
