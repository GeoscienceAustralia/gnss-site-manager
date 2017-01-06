import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {PressureSensorViewModel} from './pressure-sensor-view-model';

/**
 * This component represents a group of Pressure Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'pressure-sensors-group',
  templateUrl: 'pressure-sensors-group.component.html',
})
export class PressureSensorsGroupComponent extends AbstractGroup<PressureSensorViewModel> {
  public miscUtils: any = MiscUtils;

  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.pressureSensors);
    console.log('PressureSensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.pressureSensors);
    console.log('PressureSensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'Pressure Sensor';
  }

  compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = obj1.startDate;
      let date2: string = obj2.startDate;
      return AbstractGroup.compareDates(date1, date2);
    }
  }

  /**
   * Create a new view model and set any required default values .
   * These are set here so that only selecting "new item" in the UI
   * sets default values and loading an invalid record from the database does not.
   */
  newViewModelItem(): PressureSensorViewModel {
    let viewModel = new PressureSensorViewModel();
    let presentDT: string = MiscUtils.getPresentDateTime();
    viewModel.startDate = presentDT;
    viewModel.calibrationDate = presentDT;
    return viewModel;
  }
}
