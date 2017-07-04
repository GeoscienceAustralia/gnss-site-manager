import { GnssAntennaViewModel } from '../gnss-antenna/gnss-antenna-view-model';
import { SurveyedLocalTieViewModel } from '../surveyed-local-tie/surveyed-local-tie-view-model';
import { FrequencyStandardViewModel } from '../frequency-standard/frequency-standard-view-model';
import { LocalEpisodicEffectViewModel } from '../local-episodic-effect/local-episodic-effect-view-model';
import { HumiditySensorViewModel } from '../humidity-sensor/humidity-sensor-view-model';
import { PressureSensorViewModel } from '../pressure-sensor/pressure-sensor-view-model';
import { TemperatureSensorViewModel } from '../temperature-sensor/temperature-sensor-view-model';
import { ResponsiblePartyViewModel } from '../responsible-party/responsible-party-view-model';
import { GnssReceiverViewModel } from '../gnss-receiver/gnss-receiver-view-model';
import { RadioInterferenceViewModel } from '../radio-interference/radio-interference-view-model';
import { SignalObstructionViewModel } from '../signal-obstruction/signal-obstruction-view-model';
import { MultipathSourceViewModel } from '../multipath-source/multipath-source-view-model';
import { SiteLocationViewModel } from '../site-information/site-location-view-model';
import { SiteIdentificationViewModel } from '../site-information/site-identification-view-model';

export class SiteInformationViewModel {
    siteIdentification = new SiteIdentificationViewModel();
    siteLocation = new SiteLocationViewModel();
}

/**
 * View Model equivalent of ../data-model/SiteLogDataModel
 */
export class SiteLogViewModel {
    siteInformation = new SiteInformationViewModel();
    gnssReceivers: GnssReceiverViewModel[] = [];
    gnssAntennas: GnssAntennaViewModel[] = [];
    surveyedLocalTies: SurveyedLocalTieViewModel[] = [];
    frequencyStandards: FrequencyStandardViewModel[] = [];
    localEpisodicEffects : LocalEpisodicEffectViewModel[] = [];
    humiditySensors: HumiditySensorViewModel[] = [];
    pressureSensors: PressureSensorViewModel[] = [];
    temperatureSensors: TemperatureSensorViewModel[] = [];
    waterVaporSensors: any[] = [];
    siteOwner: ResponsiblePartyViewModel[] = [];             // Array of 0..1 item
    siteContacts: ResponsiblePartyViewModel[] = [];
    siteMetadataCustodian: ResponsiblePartyViewModel[] = []; // Array of 0..1 item
    siteDataCenters: ResponsiblePartyViewModel[] = [];
    siteDataSource: ResponsiblePartyViewModel[] = [];
    radioInterferences: RadioInterferenceViewModel[] = [];
    signalObstructions: SignalObstructionViewModel[] = [];
    multipathSources: MultipathSourceViewModel[] = [];
    moreInformation: any = {};
    dataStreams: any = {};
}
