import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/http-request/site-log.service';
import { SignalObstructionViewModel } from './signal-obstruction-view-model';

/**
 * This component represents a single signal obstruction log item.
 */
@Component({
    moduleId: module.id,
    selector: 'signal-obstruction-item',
    templateUrl: 'signal-obstruction-item.component.html',
})
export class SignalObstructionItemComponent extends AbstractItemComponent {

    @Input() signalObstruction: SignalObstructionViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Signal Obstruction';
    }

    getItem(): AbstractViewModel {
        return this.signalObstruction;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            possibleProblemSource: ['', [Validators.maxLength(100)]],
            startDate: [''],
            endDate: [''],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
