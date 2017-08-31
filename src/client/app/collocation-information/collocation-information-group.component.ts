import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { CollocationInformationViewModel } from './collocation-information-view-model';
import { SiteLogService } from '../shared/http-request/site-log.service';

/**
 * This class represents a group of colloection information log items.
 */
@Component({
    moduleId: module.id,
    selector: 'collocation-information-group',
    templateUrl: 'collocation-information-group.component.html',
})
export class CollocationInformationGroupComponent extends AbstractGroupComponent<CollocationInformationViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Collocation Information';
    }

    getControlName(): string {
        return 'collocationInformation';
    }

    getNewItemViewModel(): CollocationInformationViewModel {
        return new CollocationInformationViewModel();
    }

    allowOneCurrentItem(): boolean {
        return false;
    }
}
