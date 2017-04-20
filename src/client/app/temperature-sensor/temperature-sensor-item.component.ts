import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { DialogService } from '../shared/index';

/**
 * This component represents a single Temperature Sensor.
 */
@Component({
  moduleId: module.id,
  selector: 'temperature-sensor-item',
  templateUrl: 'temperature-sensor-item.component.html',
})
export class TemperatureSensorItemComponent extends AbstractItem implements OnInit {
  /**
   * The TemperatureSensor in question.
   */
  @Input() temperatureSensor: TemperatureSensorViewModel;

  constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
    super(dialogService);
  }

  ngOnInit() {
        this.setupForm();
        this.patchForm();
    }

    protected patchForm() {
        this.itemGroup.setValue(this.temperatureSensor);//, {emitEvent: false});
    }

  getItemName(): string {
    return 'Temperature Sensor';
  }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            manufacturer: [''],//, [Validators.required, Validators.minLength(100)]],
            serialNumber: [''],//, [Validators.required, Validators.maxLength(100)]],
            dataSamplingInterval: ['', []],
            accuracyDegreesCelcius: ['', []],
            heightDiffToAntenna: ['', []],
            calibrationDate: ['', []],
            startDate: [''],//, [Validators.required]],
            endDate: ['', []],  // requiredIfNotCurrent="true"
            notes: [''], //, [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        this.addToGroupArray(this.itemGroup);
    }
}
