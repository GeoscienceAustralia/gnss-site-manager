import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';

/**
 * This class represents a group of Temperature Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'temperature-sensors-group',
  templateUrl: 'temperature-sensors-group.component.html',
})
export class TemperatureSensorsGroupComponent extends AbstractGroup<TemperatureSensorViewModel> implements OnInit {

    static compare(obj1: TemperatureSensorViewModel, obj2: TemperatureSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

  @Input()
  set siteLogModel(siteLogModel: any) {
    siteLogModel && this.setItemsCollection(siteLogModel.temperatureSensors);
    console.log('TemperatureSensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.temperatureSensors);
    console.log('TemperatureSensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

    ngOnInit() {
        this.setupForm();
    }

  getItemName(): string {
    return 'Temperature Sensor';
  }

    compare(obj1: TemperatureSensorViewModel, obj2: TemperatureSensorViewModel): number {
        return TemperatureSensorsGroupComponent.compare(obj1, obj2);
    }

  newViewModelItem(blank?: boolean): TemperatureSensorViewModel {
    return new TemperatureSensorViewModel(blank);
  }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('temperatureSensors', this.groupArrayForm);
    }
}
