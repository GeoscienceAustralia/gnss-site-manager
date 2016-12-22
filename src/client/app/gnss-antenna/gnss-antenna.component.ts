import {Component, Input} from '@angular/core';
import { MiscUtils, JsonCheckService } from '../shared/index';

/**
 * This class represents the GnssAntennaComponent for viewing and editing GNSS antenna information.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-antenna',
  templateUrl: 'gnss-antenna.component.html',
})
export class GnssAntennaComponent {
  public hasNewAntenna: boolean = false;
  public miscUtils: any = MiscUtils;
  @Input() status: any;
  @Input() gnssAntennas: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;

  constructor(private jsonCheckService: JsonCheckService) { }


  /**
   * Add a new empty antenna as current one and push the 'old' current antenna into previous list
   */
  public addNewAntenna() {
    let presentDT = MiscUtils.getPresentDateTime();
    if (!this.gnssAntennas) {
      this.gnssAntennas = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.gnssAntennas !== null && this.gnssAntennas.length > 0) {
      this.status.isAntennasOpen[0] = false;
      let currentAntenna: any = this.gnssAntennas[0];
      if (!currentAntenna.dateRemoved.value[0] ) {
        currentAntenna.dateRemoved.value[0] = presentDT;
      }
    }

    // Create a new empty antenna with present date/time as default value to dateInstalled
    let newAntenna = this.jsonCheckService.getNewAntenna();

    // Clone from one of GNSS Antenna objects so that the "new" antenna object can be saved
    let antennaObj: any = {};
    if ( this.siteLogModel.gnssAntennas && this.siteLogModel.gnssAntennas.length > 0 ) {
      antennaObj = MiscUtils.cloneJsonObj(this.siteLogModel.gnssAntennas[0]);
    }

    // Keep a copy of the antenna object as the original one for comparison
    let antennaObjCopy: any = MiscUtils.cloneJsonObj(antennaObj);
    antennaObjCopy.gnssAntenna = MiscUtils.cloneJsonObj(newAntenna);
    this.siteLogOrigin.gnssAntennas.unshift(antennaObjCopy);

    newAntenna.dateInstalled.value[0] = presentDT;
    antennaObj.gnssAntenna = newAntenna;
    this.siteLogModel.gnssAntennas.unshift(antennaObj);

    // Add the new antenna as current one and open it by default
    this.gnssAntennas.unshift(newAntenna);
    this.status.isAntennasOpen.unshift(true);
    this.status.isAntennaGroupOpen = true;
    this.status.hasNewAntenna = true;
  }

  /**
   * Remove the new current antenna from the antenna list and restore the old current antenna
   */
  public removeNewAntenna() {
    this.siteLogModel.gnssAntennas.shift();
    this.siteLogOrigin.gnssAntennas.shift();
    this.gnssAntennas.shift();
    this.status.isAntennasOpen.shift();
    this.status.hasNewAntenna = false;
    if (this.gnssAntennas !== null && this.gnssAntennas.length > 0) {
      this.status.isAntennasOpen[0] = true;
      this.gnssAntennas[0].dateRemoved.value[0] = '';
    }
  }

  /**
   * Update the isOpen flags for all previous GNSS antennas
   */
  public togglePrevAntennas(flag: boolean) {
    for (let i = 1; i < this.status.isAntennasOpen.length; i ++) {
      this.status.isAntennasOpen[i] = flag;
    }
  }

  /**
   * Returns true if all previous GNSS antennas are open, otherwise returns false
   */
  public arePrevAntennasOpen() {
    for (let i = 1; i < this.status.isAntennasOpen.length; i ++) {
      if (!this.status.isAntennasOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS antennas are closed, otherwise returns false
   */
  public arePrevAntennasClosed() {
    for (let index = 1; index < this.status.isAntennasOpen.length; index ++) {
      if (this.status.isAntennasOpen[index]) {
        return false;
      }
    }
    return true;
  }

}
