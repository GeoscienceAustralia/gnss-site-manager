import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { SignalObstructionViewModel } from './signal-obstruction-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'signal-obstructions-group',
    templateUrl: '../shared/abstract-groups-items/abstract-group.component.html',
})
export class SignalObstructionGroupComponent extends AbstractGroupComponent<SignalObstructionViewModel> {

    constructor(protected siteLogService: SiteLogService, formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'Signal Obstruction';
    }

    getControlName(): string {
        return 'signalObstructions';
    }

    getNewItemViewModel(): SignalObstructionViewModel {
        return new SignalObstructionViewModel();
    }
}
