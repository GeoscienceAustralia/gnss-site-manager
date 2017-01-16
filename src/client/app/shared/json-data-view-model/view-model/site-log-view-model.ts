import {GnssReceiverViewModel} from '../../../gnss-receiver/gnss-receiver-view-model';
import {GnssAntennaViewModel} from '../../../gnss-antenna/gnss-antenna-view-model';
import {FrequencyStandardViewModel} from '../../../frequency-standard/frequency-standard-view-model';
import {HumiditySensorViewModel} from '../../../humidity-sensor/humidity-sensor-view-model';
import {PressureSensorViewModel} from '../../../pressure-sensor/pressure-sensor-view-model';
import {TemperatureSensorViewModel} from '../../../temperature-sensor/temperature-sensor-view-model';

/**
 * View Model equivalent of ../data-model/SiteLogDataModel
 */
export class SiteLogViewModel {
  siteLog: ViewSiteLog;
}

export class ViewSiteLog {
  siteIdentification: any;
  siteLocation: any;
  gnssReceivers: GnssReceiverViewModel[];
  gnssAntennas: GnssAntennaViewModel[];
  surveyedLocalTies: any[];
  frequencyStandards: FrequencyStandardViewModel[];
  humiditySensors: HumiditySensorViewModel[];
  pressureSensors: PressureSensorViewModel[];
  temperatureSensors: TemperatureSensorViewModel[];
  waterVaporSensors: any[];
  siteOwner: any[];
  siteContact: any[];
  siteMetadataCustodian: any;
  siteDataSource: any;
  moreInformation: any;
  dataStreamsSet: any;
}
