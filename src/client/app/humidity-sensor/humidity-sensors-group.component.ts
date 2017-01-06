import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {HumiditySensorViewModel} from './humidity-sensor-view-model';

/**
 * This class represents a group of Humidity Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensors-group',
  templateUrl: 'humidity-sensors-group.component.html',
})
export class HumiditySensorsGroupComponent extends AbstractGroup<HumiditySensorViewModel> {
  public miscUtils: any = MiscUtils;

  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.humiditySensors);
    console.log('HumiditySensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.humiditySensors);
    console.log('HumiditySensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'Humidity Sensor';
  }

  compare(obj1: HumiditySensorViewModel, obj2: HumiditySensorViewModel): number {
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
  newViewModelItem(): HumiditySensorViewModel {
    let viewModel = new HumiditySensorViewModel();
    let presentDT: string = MiscUtils.getPresentDateTime();
    viewModel.startDate = presentDT;
    viewModel.calibrationDate = presentDT;
    return viewModel;
  }
}
