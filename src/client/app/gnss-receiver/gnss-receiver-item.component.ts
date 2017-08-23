import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single GNSS Receiver.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receiver-item',
    templateUrl: 'gnss-receiver-item.component.html',
})
export class GnssReceiverItemComponent extends AbstractItemComponent {
    /**
     * The GnssReceiver in question.
     */
    @Input() gnssReceiver: GnssReceiverViewModel;

    public satelliteSystemList: string[] = ['GPS', 'GLO', 'GAL', 'BDS', 'QZSS', 'SBAS', 'IRNSS'];

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            receiverType: [' '],
            manufacturerSerialNumber: [''],
            startDate: [''],
            endDate: [''],
            firmwareVersion: [''],
            satelliteSystems: ['', [Validators.maxLength(200)]],
            elevationCutoffSetting: ['', [Validators.maxLength(25)]],
            temperatureStabilization: ['', [Validators.maxLength(25)]],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }

    getItem(): AbstractViewModel {
        return this.gnssReceiver;
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }
}
