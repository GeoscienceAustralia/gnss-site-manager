import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single Humidity Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensor-item',
    templateUrl: 'humidity-sensor-item.component.html',
})
export class HumiditySensorItemComponent extends AbstractItemComponent {
    /**
     * The HumiditySensor in question.
     */
    @Input() humiditySensor: HumiditySensorViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    getItem(): AbstractViewModel {
        return this.humiditySensor;
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
            {manufacturer: new FormControl('')},//, [Validators.required, Validators.minLength(100)]],
            {serialNumber: new FormControl('')},//, [Validators.required, Validators.maxLength(100)]],
            {dataSamplingInterval: new FormControl('')},
            {accuracyPercentRelativeHumidity: new FormControl('')},
            {aspiration: new FormControl('')},
            {heightDiffToAntenna: new FormControl('')},
            {calibrationDate: new FormControl('')},
            {startDate: new FormControl('')},//, [Validators.required]],
            {endDate: new FormControl('')},  // requiredIfNotCurrent="true"
            {notes: new FormControl(['', [Validators.maxLength(2000)]])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

}
