import {Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MiscUtils, JsonCheckService, ServiceWorkerService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-receiever',
  templateUrl: 'gnss-receiver.component.html',
})
export class GnssReceiverComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public errorMessage: string;
  private cacheItems: Array<string> = [];
  public hasNewReceiver: boolean = false;
  public miscUtils: any = MiscUtils;
  @Input() status: any;
  @Input() gnssReceivers: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;

  constructor(private jsonCheckService: JsonCheckService,
              private serviceWorkerService: ServiceWorkerService) { }

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Component method to retrieve the list of URLs cached in the Service Worker and to update the this.cacheItem array
   */
  updateCacheList = (): void => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  };

  /**
   * Returns true if all previous GNSS receivers are open, otherwise returns false
   */
  public arePrevReceiversOpen() {
    for (let i = 1; i < this.status.isReceiversOpen.length; i ++) {
      if (!this.status.isReceiversOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS receivers are closed, otherwise returns false
   */
  public arePrevReceiversClosed() {
    for (let i = 1; i < this.status.isReceiversOpen.length; i ++) {
      if (this.status.isReceiversOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update the isOpen flags for all previous GNSS receivers,sko
   */
  public togglePrevReceivers(flag: boolean) {
    for (let i = 1; i < this.status.isReceiversOpen.length; i ++) {
      this.status.isReceiversOpen[i] = flag;
    }
  }

  /**
   * Add a new empty receiver as current one and push the 'old' current receiver into previous list
   */
  public addNewReceiver() {
    let presentDT = MiscUtils.getPresentDateTime();
    if (!this.gnssReceivers) {
      this.gnssReceivers = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.gnssReceivers.length > 0) {
      this.status.isReceiversOpen[0] = false;
      let currentReceiver: any = this.gnssReceivers[0];
      if (!currentReceiver.dateRemoved.value[0] ) {
        currentReceiver.dateRemoved.value[0] = presentDT;
      }
    }

    // Create a new empty receiver with present date/time as default value to dateInstalled
    let newReceiver = this.jsonCheckService.getNewReceiver();

    // Clone from one of GNSS Receiver objects so that the "new" receiver object can be saved
    let receiverObj: any = {};
    if ( this.siteLogModel.gnssReceivers && this.siteLogModel.gnssReceivers.length > 0 ) {
      receiverObj = MiscUtils.cloneJsonObj(this.siteLogModel.gnssReceivers[0]);
    }

    // Keep a copy of the receiver object as the original one for comparison
    let receiverObjCopy: any = MiscUtils.cloneJsonObj(receiverObj);
    receiverObjCopy.gnssReceiver = MiscUtils.cloneJsonObj(newReceiver);
    this.siteLogOrigin.gnssReceivers.unshift(receiverObjCopy);

    newReceiver.dateInstalled.value[0] = presentDT;
    receiverObj.gnssReceiver = newReceiver;
    this.siteLogModel.gnssReceivers.unshift(receiverObj);

    // Add the new receiver as current one and open it by default
    this.gnssReceivers.unshift(newReceiver);
    this.status.isReceiversOpen.unshift(true);
    this.status.isReceiverGroupOpen = true;
    this.status.hasNewReceiver = true;
  }

  /**
   * Remove the new current receiver from the receiver list and restore the old current receiver
   */
  public removeNewReceiver() {
    this.siteLogModel.gnssReceivers.shift();
    this.siteLogOrigin.gnssReceivers.shift();
    this.gnssReceivers.shift();
    this.status.isReceiversOpen.shift();
    this.status.hasNewReceiver = false;
    if (this.gnssReceivers !== null && this.gnssReceivers.length > 0) {
      this.status.isReceiversOpen[0] = true;
      this.gnssReceivers[0].dateRemoved.value[0] = '';
    }
  }
}
