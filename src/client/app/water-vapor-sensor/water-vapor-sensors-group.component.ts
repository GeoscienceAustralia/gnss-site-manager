import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';

/**
 * This class represents a group of WaterVapor Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'water-vapor-sensors-group',
  templateUrl: 'water-vapor-sensors-group.component.html',
})
export class WaterVaporSensorsGroupComponent extends AbstractGroup<WaterVaporSensorViewModel> implements OnInit {
    static compare(obj1: WaterVaporSensorViewModel, obj2: WaterVaporSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

  @Input()
  set siteLogModel(siteLogModel: any) {
    siteLogModel && this.setItemsCollection(siteLogModel.waterVaporSensors);
    console.log('WaterVaporSensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.waterVaporSensors);
    console.log('WaterVaporSensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

    ngOnInit() {
        this.setupForm();
    }

   getItemName(): string {
    return 'Water Vapor Sensor';
  }

    compare(obj1: WaterVaporSensorViewModel, obj2: WaterVaporSensorViewModel): number {
        return WaterVaporSensorsGroupComponent.compare(obj1, obj2);
    }

  newViewModelItem(blank?: boolean): WaterVaporSensorViewModel {
    return new WaterVaporSensorViewModel(blank);
  }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('waterVaporSensors', this.groupArrayForm);
    }
}
