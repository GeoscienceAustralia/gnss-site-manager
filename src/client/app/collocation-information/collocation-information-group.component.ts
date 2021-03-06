import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { CollocationInformationViewModel } from './collocation-information-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of colloection information log items.
 */
@Component({
    moduleId: module.id,
    selector: 'collocation-information-group',
    templateUrl: 'collocation-information-group.component.html',
})
export class CollocationInformationGroupComponent extends AbstractGroupComponent<CollocationInformationViewModel> {

    constructor(protected siteLogService: SiteLogService) {
        super(siteLogService);
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
