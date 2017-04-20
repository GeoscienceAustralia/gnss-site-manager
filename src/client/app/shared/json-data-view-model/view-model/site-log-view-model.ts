import { GnssAntennaViewModel } from '../../../gnss-antenna/gnss-antenna-view-model';
import { SurveyedLocalTieViewModel } from '../../../surveyed-local-tie/surveyed-local-tie-view-model';
import { FrequencyStandardViewModel } from '../../../frequency-standard/frequency-standard-view-model';
import { LocalEpisodicEffectViewModel } from '../../../local-episodic-effect/local-episodic-effect-view-model';
import { HumiditySensorViewModel } from '../../../humidity-sensor/humidity-sensor-view-model';
import { PressureSensorViewModel } from '../../../pressure-sensor/pressure-sensor-view-model';
import { TemperatureSensorViewModel } from '../../../temperature-sensor/temperature-sensor-view-model';
import { ResponsiblePartyViewModel } from '../../../responsible-party/responsible-party-view-model';
import { GnssReceiverViewModel } from '../../../gnss-receiver/gnss-receiver-view-model';
/**
 * View Model equivalent of ../data-model/SiteLogDataModel
 */
// TODO: Remove this extra level of nesting, if not needed.
export class SiteLogViewModel {
    siteLog: ViewSiteLog = new ViewSiteLog();
}

export class ViewSiteLog {
    siteIdentification: any = {};
    siteLocation: any = {};
    gnssReceivers: GnssReceiverViewModel[];
    gnssAntennas: GnssAntennaViewModel[];
    surveyedLocalTies: SurveyedLocalTieViewModel[];
    frequencyStandards: FrequencyStandardViewModel[];
    localEpisodicEffects : LocalEpisodicEffectViewModel[];
    humiditySensors: HumiditySensorViewModel[];
    pressureSensors: PressureSensorViewModel[];
    temperatureSensors: TemperatureSensorViewModel[];
    waterVaporSensors: any[];
    siteOwner: ResponsiblePartyViewModel[];             // Array of 0..1 item
    siteContact: ResponsiblePartyViewModel[];
    siteMetadataCustodian: ResponsiblePartyViewModel[]; // Array of 0..1 item
    // siteDataCenter: ResponsiblePartyViewModel[];
    siteDataSource: ResponsiblePartyViewModel[];
    moreInformation: any = {};
    dataStreams: any = {};
}
