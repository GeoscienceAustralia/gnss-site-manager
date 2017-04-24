import { Component, Input } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';

/**.
 * This class represents a group of Humidity Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensors-group',
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
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(): HumiditySensorViewModel {
        return new HumiditySensorViewModel();
    }
}
