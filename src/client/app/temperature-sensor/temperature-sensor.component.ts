import {Component, Input} from '@angular/core';
import { MiscUtilsService, JsonCheckService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-temperature-sensor',
  templateUrl: 'temperature-sensor.component.html',
})
export class GnssTemperatureSensorComponent {
  public errorMessage: string;
  @Input() status: any;
  @Input() temperatureSensors: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;

  constructor(private miscUtilsService: MiscUtilsService,
              private jsonCheckService: JsonCheckService) { }

  /**
   * Returns the date string (YYYY-MM-DD) from the date-time string (YYYY-MM-DDThh:mm:ssZ)
   */
  public getDate(datetime: string) {
    if ( datetime === null || typeof datetime === 'undefined') {
      return '';
    } else if (datetime.length < 10) {
      return datetime;
    }
    return datetime.substring(0, 10);
  }


  /**
   * Returns true if all previous GNSS temperature sensors are open, otherwise returns false
   */
  public arePrevTemperatureSensorsOpen() {
    if(this.status.isTemperatureSensorsOpen === null) {
      throw new Error('status.isTemperatureSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isTemperatureSensorsOpen.length; i ++) {
      if (!this.status.isTemperatureSensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS temperature sensors are closed, otherwise returns false
   */
  public arePrevTemperatureSensorsClosed() {
    if(this.status.isTemperatureSensorsOpen === null) {
      throw new Error('status.isTemperatureSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isTemperatureSensorsOpen.length; i ++) {
      if (this.status.isTemperatureSensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update the isOpen flags for all previous GNSS temperature sensors
   */
  public togglePrevTemperatureSensors(flag: boolean) {
    if(this.status.isTemperatureSensorsOpen === null) {
      throw new Error('status.isTemperatureSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isTemperatureSensorsOpen.length; i ++) {
      this.status.isTemperatureSensorsOpen[i] = flag;
    }
  }

  /**
   * Add a new empty temperature sensors as current one and push the 'old' current temperature sensors into previous list
   */
  public addNewTemperatureSensor() {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.temperatureSensors) {
      this.temperatureSensors = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.temperatureSensors.length > 0) {
      this.status.isTemperatureSensorsOpen[0] = false;
      let currentTemperatureSensor: any = this.temperatureSensors[0];
      if (!currentTemperatureSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]
      || currentTemperatureSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] === '') {
        currentTemperatureSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
      }
    }

    let newSensor = this.jsonCheckService.getNewTemperatureSensor();

    // Clone from one of temperature sensor objects so that the "new" temperature sensor object can be saved
    let sensorObj: any = {};
    if ( this.siteLogModel.temperatureSensors && this.siteLogModel.temperatureSensors.length > 0 ) {
      sensorObj = this.miscUtilsService.cloneJsonObj(this.siteLogModel.temperatureSensors[0]);
    }

    // Keep a copy of the temperature sensor object as the original one for comparison
    let sensorObjCopy: any = this.miscUtilsService.cloneJsonObj(sensorObj);
    sensorObjCopy.temperatureSensor = this.miscUtilsService.cloneJsonObj(newSensor);
    if (!this.siteLogOrigin.temperatureSensors) {
      this.siteLogOrigin.temperatureSensors = [];
    }
    this.siteLogOrigin.temperatureSensors.unshift(sensorObjCopy);

    newSensor.calibrationDate.value[0] = presentDT;
    newSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;
    sensorObj.temperatureSensor = newSensor;
    if (!this.siteLogModel.temperatureSensors) {
      this.siteLogModel.temperatureSensors = [];
    }
    this.siteLogModel.temperatureSensors.unshift(sensorObj);

    // Add the new temperature sensor as current one and open it by default
    this.temperatureSensors.unshift(newSensor);
    this.status.isTemperatureSensorsOpen.unshift(true);
    this.status.isTemperatureSensorsGroupOpen = true;
    this.status.hasNewTemperatureSensor = true;
  }

  /**
   * Remove the new current temperature sensor from the temperature sensor list and restore the old current temperature sensor
   */
  public removeNewTemperatureSensors() {
    this.siteLogModel.temperatureSensors.shift();
    this.siteLogOrigin.temperatureSensors.shift();
    this.temperatureSensors.shift();
    this.status.isTemperatureSensorsOpen.shift();
    this.status.hasNewTemperatureSensor = false;
    if (this.temperatureSensors !== null && this.temperatureSensors.length > 0) {
      this.status.isTemperatureSensorsOpen[0] = true;
      this.temperatureSensors[0].calibrationDate.value[0] = '';
    }
  }

  /**
   * Date is a dateTime where time includes '.000z'.  This strips the 'T', the milliseconds and the time zone (UTC default)
   *
   * @param dateString
   */
  public formatDateString(dateString: string): string {
    let d1: string = dateString.replace('T', ' ');
    let d2: string = d1.replace(/\..+/,'');
    return d2;
  }
}
