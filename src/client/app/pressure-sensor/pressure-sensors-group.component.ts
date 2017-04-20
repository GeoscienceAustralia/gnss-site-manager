import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { PressureSensorViewModel } from './pressure-sensor-view-model';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'pressure-sensors-group',
  templateUrl: 'pressure-sensors-group.component.html',
})
export class PressureSensorsGroupComponent extends AbstractGroup<PressureSensorViewModel> implements OnInit {
    static compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    @Input()
  set siteLogModel(siteLogModel: any) {
    siteLogModel && this.setItemsCollection(siteLogModel.pressureSensors);
    console.log('PressureSensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.pressureSensors);
    console.log('PressureSensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

    ngOnInit() {
        this.setupForm();
    }

  getItemName(): string {
    return 'Pressure Sensor';
  }

    compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
        return PressureSensorsGroupComponent.compare(obj1, obj2);
    }

  newViewModelItem(blank?: boolean): PressureSensorViewModel {
    return new PressureSensorViewModel(blank);
  }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('pressureSensors', this.groupArrayForm);
    }
}
