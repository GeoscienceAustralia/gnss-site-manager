import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { DialogService } from '../shared/index';

/**
 * This component represents a single GNSS Receiver.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receiver-item',
    templateUrl: 'gnss-receiver-item.component.html',
})
export class GnssReceiverItemComponent extends AbstractItem implements OnInit {
    /**
     * The GnssReceiver in question.
     */
    @Input() gnssReceiver: GnssReceiverViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.setupForm();
        setTimeout(() => this.patchForm());
    }

    protected patchForm() {
        console.log(`receivers #${this.index} - setValue: `, this.gnssReceiver);
        this.itemGroup.setValue(this.gnssReceiver);
        // This item may now be at a new index from what it was created at.  Patch the array item at that index.
        // (<AbstractControl> this.groupArray.controls[this.getIndex()]).patchValue(this.gnssReceiver);
        // console.debug(`GnssReceiverItemComponent - setup (patch) form - index: ${this.getIndex()} -
        //   dateInstalled: `, this.gnssReceiver.dateInstalled);
        // console.debug('  groupArray: ', this.groupArray);

        // TODO - Validator Assistant - check validation before applying it so can skip it during patch ????
        // let out: any = dateTimeFormatValidator.apply(this, [this.itemGroup.controls['dateRemoved']]);
        // console.log('validate out: ', out);

        // let out2: any = Validators.required.apply(this, [this.itemGroup.controls['dateRemoved']]);
        // console.log('validate out 2: ', out2);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            receiverType: [''],//, [Validators.maxLength(100)]],
            manufacturerSerialNumber: [''],//, [Validators.maxLength(100)]],
            dateInstalled: [''],//, [Validators.required, dateTimeFormatValidator]],
            dateRemoved: [''],//, [requiredIfNotCurrent="true" , dateTimeFormatValidator]],
            firmwareVersion: [''],//, [Validators.maxLength(100)]],
            satelliteSystem: [''],//, [Validators.maxLength(100)]],
            elevationCutoffSetting: [''],//, [Validators.maxLength(100)]],
            temperatureStabilization: [''],//, [Validators.maxLength(100)]],
            notes: ['', [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: [''],
            dateInserted: [''],
            deletedReason: [''],
        });
        // console.debug('GnssReceiverItemComponent - setup (push) new form - index: ', this.getIndex());
        this.addToGroupArray(this.itemGroup);
    }
}
