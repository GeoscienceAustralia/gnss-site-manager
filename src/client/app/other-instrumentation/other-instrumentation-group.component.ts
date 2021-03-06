import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { OtherInstrumentationViewModel } from './other-instrumentation-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of other instrumentation log items.
 */
@Component({
    moduleId: module.id,
    selector: 'other-instrumentation-group',
    templateUrl: 'other-instrumentation-group.component.html',
})
export class OtherInstrumentationGroupComponent extends AbstractGroupComponent<OtherInstrumentationViewModel> {

    constructor(protected siteLogService: SiteLogService) {
        super(siteLogService);
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
