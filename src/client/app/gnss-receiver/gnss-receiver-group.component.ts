import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {GnssReceiverViewModel} from './gnss-receiver-view-model';

/**
 * This class represents a collection of GNSS Receiver Component.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-receiver-group',
  templateUrl: 'gnss-receiver-group.component.html',
})
export class GnssReceiverGroupComponent extends AbstractGroup<GnssReceiverViewModel> {
  public miscUtils: any = MiscUtils;
  public hasNewItem: boolean = false;
  @Input() gnssReceivers: any;

 @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.gnssReceivers);
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.gnssReceivers);
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'GNSS Receiver';
  }

  compare(obj1: GnssReceiverViewModel, obj2: GnssReceiverViewModel): number {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = obj1.dateInstalled;
      let date2: string = obj2.dateRemoved;
      return AbstractGroup.compareDates(date1, date2);
    }
  }

  newViewModelItem(): GnssReceiverViewModel {
    return new GnssReceiverViewModel();
  }
}
