import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

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

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        // let itemGroup: FormGroup = formBuilder.group({
        // turn off all Validators until work out solution to 'was false now true' problem
        // TODO Fix Validators
        return new ItemControls([
            {receiverType: new FormControl('')}, //, [Validators.maxLength(100)]],
            {manufacturerSerialNumber: new FormControl('', [Validators.maxLength(4)])},
            {startDate: new FormControl('')},//, [Validators.required, dateTimeFormatValidator]],
            {endDate: new FormControl('')},//, [requiredIfNotCurrent="true" , dateTimeFormatValidator]],
            {firmwareVersion: new FormControl('')},//, [Validators.maxLength(100)]],
            {satelliteSystem: new FormControl('')},//, [Validators.maxLength(100)]],
            {elevationCutoffSetting: new FormControl('')},//, [Validators.maxLength(100)]],
            {temperatureStabilization: new FormControl('')}, //, [Validators.required]],//, [Validators.maxLength(100)]],
            {notes: new FormControl('', [Validators.maxLength(20)])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

    getItem(): AbstractViewModel {
        return this.gnssReceiver;
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }
}
