import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { ReceiverTypeValidator } from './../shared/form-input-validators/receiver-type-validator';

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
    @Input() receiverCodelist: string[];

    public satelliteSystemList: string[] = ['GPS', 'GLO', 'GAL', 'BDS', 'QZSS', 'SBAS', 'IRNSS'];

    constructor(protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(dialogService, siteLogService);
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            receiverType: [' ', [Validators.minLength(1), Validators.maxLength(20),
                new ReceiverTypeValidator(this.receiverCodelist)]],
            manufacturerSerialNumber: ['', [Validators.maxLength(25)]],
            startDate: [''],
            endDate: [''],
            firmwareVersion: ['', [Validators.maxLength(25)]],
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

    onReceiverTypeChange(event:any) {
        this.gnssReceiver.receiverType = event.value;
        this.itemGroup.controls.receiverType.setValue(this.gnssReceiver.receiverType);
    }
}
