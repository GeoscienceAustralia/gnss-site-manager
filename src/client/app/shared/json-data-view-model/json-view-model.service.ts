import { Injectable } from '@angular/core';
import { SiteLogDataModel } from './data-model/site-log-data-model';
import { FrequencyStandardViewModel } from '../../frequency-standard/frequency-standard-view-model';
import { LocalEpisodicEffectViewModel } from '../../local-episodic-effect/local-episodic-effect-view-model';
import { HumiditySensorViewModel } from '../../humidity-sensor/humidity-sensor-view-model';
import { PressureSensorViewModel } from '../../pressure-sensor/pressure-sensor-view-model';
import { TemperatureSensorViewModel } from '../../temperature-sensor/temperature-sensor-view-model';
import { WaterVaporSensorViewModel } from '../../water-vapor-sensor/water-vapor-sensor-view-model';
import { SiteLogViewModel } from './view-model/site-log-view-model';
import { AbstractViewModel } from './view-model/abstract-view-model';
import { DataViewTranslatorService, ObjectMap } from './data-view-translator';
import { RadioInterferenceViewModel } from '../../radio-interference/radio-interference-view-model';
import { SignalObstructionViewModel } from '../../signal-obstruction/signal-obstruction-view-model';
import { MultipathSourceViewModel } from '../../multipath-source/multipath-source-view-model';
import * as _ from 'lodash';
import { MiscUtils } from '../global/misc-utils';
import { CartesianPosition, GeodeticPosition } from '../../site-log/site-location-view-model';

/* tslint:disable:max-line-length */

let dateMap = new ObjectMap().addSourcePostMap((source: string): string => {
    return source ? MiscUtils.formatUTCDateTime(source) : null;
});

let siteIdentificationMap = new ObjectMap()
    .addFieldMap('fourCharacterID', 'fourCharacterID')
    .addFieldMap('siteName', 'siteName')
    .addFieldMap('bedrockCondition', 'bedrockCondition')
    .addFieldMap('bedrockType', 'bedrockType')
    .addFieldMap('cdpNumber', 'cdpNumber')
    .addFieldMap('dateInstalled.value[0]', 'dateInstalled', dateMap)
    .addFieldMap('distanceActivity', 'distanceActivity')
    .addFieldMap('faultZonesNearby.value', 'faultZonesNearby')
    .addFieldMap('foundationDepth', 'foundationDepth')
    .addFieldMap('fractureSpacing', 'fractureSpacing')
    .addFieldMap('geologicCharacteristic.value', 'geologicCharacteristic')
    .addFieldMap('heightOfTheMonument', 'heightOfTheMonument')
    .addFieldMap('iersDOMESNumber', 'iersDOMESNumber')
    .addFieldMap('markerDescription', 'markerDescription')
    .addFieldMap('monumentDescription.value', 'monumentDescription')
    .addFieldMap('monumentFoundation', 'monumentFoundation')
    .addFieldMap('monumentInscription', 'monumentInscription')
    .addFieldMap('notes', 'notes')
;

export let cartesianPositionMap = new ObjectMap()
    .addTargetPreMap((p: CartesianPosition): CartesianPosition | null => {
        return p.x && p.y && p.z ? p : null;
    })
    .addFieldMap('point.pos.value[0]', 'x')
    .addFieldMap('point.pos.value[1]', 'y')
    .addFieldMap('point.pos.value[2]', 'z')
    .addTargetPostMap((p: CartesianPosition | null | undefined): CartesianPosition => {
        return p || new CartesianPosition();
    })
;

export let geodeticPositionMap = new ObjectMap()
    .addTargetPreMap((p: GeodeticPosition): GeodeticPosition | null => {
        return p.lat && p.lon && p.height ? p : null;
    })
    .addFieldMap('point.pos.value[0]', 'lat')
    .addFieldMap('point.pos.value[1]', 'lon')
    .addFieldMap('point.pos.value[2]', 'height')
    .addTargetPostMap((p: GeodeticPosition | null | undefined): GeodeticPosition => {
        return p || new GeodeticPosition();
    })
;

let siteLocationMap = new ObjectMap()
    .addFieldMap('city', 'city')
    .addFieldMap('state', 'state')
    .addFieldMap('countryCodeISO.value', 'countryCodeISO')
    .addFieldMap('tectonicPlate.value', 'tectonicPlate')
    .addFieldMap('approximatePositionITRF.cartesianPosition', 'cartesianPosition', cartesianPositionMap)
    .addFieldMap('approximatePositionITRF.geodeticPosition', 'geodeticPosition', geodeticPositionMap)
    .addFieldMap('notes', 'notes')
;

let responsiblePartyMap = new ObjectMap()

    .addSourcePreMap((source: any): any => {
        return source.ciResponsibleParty ? source : null;
    })

    .addFieldMap('ciResponsibleParty.individualName.characterString.gco:CharacterString', 'individualName')
    .addFieldMap('ciResponsibleParty.organisationName.characterString.gco:CharacterString', 'organisationName')
    .addFieldMap('ciResponsibleParty.positionName.characterString.gco:CharacterString', 'positionName')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.deliveryPoint[0].characterString.gco:CharacterString', 'deliveryPoint')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.city.characterString.gco:CharacterString', 'city')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.administrativeArea.characterString.gco:CharacterString', 'administrativeArea')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.postalCode.characterString.gco:CharacterString', 'postalCode')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.city.country.characterString.gco:CharacterString', 'country')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.electronicMailAddress[0].characterString.gco:CharacterString', 'email')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.phone.ciTelephone.voice[0].characterString.gco:CharacterString', 'phone')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.phone.ciTelephone.facsimile[0].characterString.gco:CharacterString', 'fax')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.onlineResource.ciOnlineResource.linkage.url', 'url')
;
/* tslint:disable:max-line-length */

let gnssReceiverMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('gnssReceiver.dateInstalled.value[0]', 'startDate', dateMap)
    .addFieldMap('gnssReceiver.dateRemoved.value[0]', 'endDate', dateMap)
    .addFieldMap('gnssReceiver.igsModelCode.value', 'receiverType')
    .addFieldMap('gnssReceiver.manufacturerSerialNumber', 'manufacturerSerialNumber')
    .addFieldMap('gnssReceiver.firmwareVersion', 'firmwareVersion')
    .addFieldMap('gnssReceiver.satelliteSystem[0].value', 'satelliteSystem')
    .addFieldMap('gnssReceiver.elevationCutoffSetting', 'elevationCutoffSetting')
    .addFieldMap('gnssReceiver.temperatureStabilization', 'temperatureStabilization')
    .addFieldMap('gnssReceiver.notes', 'notes')
;

let gnssAntennaMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('gnssAntenna.dateInstalled.value[0]', 'startDate', dateMap)
    .addFieldMap('gnssAntenna.dateRemoved.value[0]', 'endDate', dateMap)
    .addFieldMap('gnssAntenna.igsModelCode.value', 'antennaType')
    .addFieldMap('gnssAntenna.manufacturerSerialNumber', 'serialNumber')
    .addFieldMap('gnssAntenna.antennaReferencePoint.value', 'antennaReferencePoint')
    .addFieldMap('gnssAntenna.markerArpEastEcc', 'markerArpEastEcc')
    .addFieldMap('gnssAntenna.markerArpUpEcc', 'markerArpUpEcc')
    .addFieldMap('gnssAntenna.markerArpNorthEcc', 'markerArpNorthEcc',)
    .addFieldMap('gnssAntenna.alignmentFromTrueNorth', 'alignmentFromTrueNorth')
    .addFieldMap('gnssAntenna.antennaRadomeType.value', 'antennaRadomeType')
    .addFieldMap('gnssAntenna.radomeSerialNumber', 'radomeSerialNumber')
    .addFieldMap('gnssAntenna.antennaCableType', 'antennaCableType')
    .addFieldMap('gnssAntenna.antennaCableLength', 'antennaCableLength')
    .addFieldMap('gnssAntenna.notes', 'notes')
;

let surveyedLocalTieMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('surveyedLocalTie.tiedMarkerName', 'tiedMarkerName')
    .addFieldMap('surveyedLocalTie.tiedMarkerUsage', 'tiedMarkerUsage')
    .addFieldMap('surveyedLocalTie.tiedMarkerCDPNumber', 'tiedMarkerCDPNumber')
    .addFieldMap('surveyedLocalTie.tiedMarkerDOMESNumber', 'tiedMarkerDOMESNumber')
    .addFieldMap('surveyedLocalTie.localSiteTiesAccuracy', 'localSiteTiesAccuracy')
    .addFieldMap('surveyedLocalTie.surveyMethod', 'surveyMethod')
    .addFieldMap('surveyedLocalTie.differentialComponentsGNSSMarkerToTiedMonumentITRS.dx', 'dx')
    .addFieldMap('surveyedLocalTie.differentialComponentsGNSSMarkerToTiedMonumentITRS.dy', 'dy')
    .addFieldMap('surveyedLocalTie.differentialComponentsGNSSMarkerToTiedMonumentITRS.dz', 'dz')
    .addFieldMap('surveyedLocalTie.dateMeasured.value[0]', 'startDate', dateMap)
    .addFieldMap('surveyedLocalTie.notes', 'notes')
;

function removeNullsFromArrays(obj: Object): void {
    traverse(obj, (array: any[]): any[] => {
        return _.filter(array, (element: any) => { return !!element; });
    });
}

function traverse(obj: Object, mapArray: (array: any[]) => any[]): void {
    _.forIn(obj, (value, key) => {
        if (_.isArray(value)) {
            (obj as any)[key] = mapArray(value);
            value.forEach((element: any) => {
                if (_.isObject(element)) {
                    traverse(element, mapArray);
                }
            });
        }
        if (_.isObject(value)) {
            traverse(value, mapArray);
        }
    });
}

let siteLogMap = new ObjectMap()
    .addFieldMap('siteIdentification', 'siteInformation.siteIdentification', siteIdentificationMap)
    .addFieldMap('siteLocation', 'siteInformation.siteLocation', siteLocationMap)

    .addFieldMap('siteOwner', 'siteOwner[0]', responsiblePartyMap)
    .addFieldMap('siteContacts', 'siteContacts', responsiblePartyMap)
    .addFieldMap('siteMetadataCustodian', 'siteMetadataCustodian[0]', responsiblePartyMap)
    .addFieldMap('siteDataCenters', 'siteDataCenters', responsiblePartyMap)
    .addFieldMap('siteDataSource', 'siteDataSource[0]', responsiblePartyMap)

    .addFieldMap('gnssReceivers', 'gnssReceivers', gnssReceiverMap)
    .addFieldMap('gnssAntennas', 'gnssAntennas', gnssAntennaMap)
    .addFieldMap('surveyedLocalTies', 'surveyedLocalTies', surveyedLocalTieMap)

    .addTargetPostMap((target: any): any => {
        removeNullsFromArrays(target);
        return target;
    })
;

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */
@Injectable()
export class JsonViewModelService {
    /**
     * Given Geodesy data model JSON, translate to view model json.
     * @param dataModel from the GeodesyML - complete ViewSiteLog instance.
     * @return  translated ViewModel
     */
    public dataModelToViewModel(dataModel: any): SiteLogViewModel {
        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel(dataModel);
        console.debug('dataModelToViewModel - siteLogDataModel: ', siteLogDataModel);

        let siteLogViewModel: SiteLogViewModel = new SiteLogViewModel();

        siteLogViewModel.frequencyStandards = this.dataToViewModel(siteLogDataModel.frequencyStandards, FrequencyStandardViewModel);
        siteLogViewModel.localEpisodicEffects = this.dataToViewModel(siteLogDataModel.localEpisodicEffects, LocalEpisodicEffectViewModel);
        siteLogViewModel.humiditySensors = this.dataToViewModel(siteLogDataModel.humiditySensors, HumiditySensorViewModel);
        siteLogViewModel.pressureSensors = this.dataToViewModel(siteLogDataModel.pressureSensors, PressureSensorViewModel);
        siteLogViewModel.temperatureSensors = this.dataToViewModel(siteLogDataModel.temperatureSensors, TemperatureSensorViewModel);
        siteLogViewModel.waterVaporSensors = this.dataToViewModel(siteLogDataModel.waterVaporSensors, WaterVaporSensorViewModel);

        siteLogViewModel.radioInterferences = this.dataToViewModel(siteLogDataModel.radioInterferences, RadioInterferenceViewModel);
        siteLogViewModel.signalObstructions = this.dataToViewModel(siteLogDataModel.signalObstructions, SignalObstructionViewModel);
        siteLogViewModel.multipathSources = this.dataToViewModel(siteLogDataModel.multipathSources, MultipathSourceViewModel);

        // For now just copy the DataModel parts over that haven't had translate to view written yet
        siteLogViewModel.moreInformation = siteLogDataModel.moreInformation;
        siteLogViewModel.dataStreams = siteLogDataModel.dataStreams;

        _.merge(siteLogViewModel, siteLogMap.map(siteLogDataModel));

        console.debug('dataModelToViewModel - siteLogViewModel: ', siteLogViewModel);
        return siteLogViewModel;
    }

    public viewModelToDataModel(viewModel: SiteLogViewModel): SiteLogDataModel {
        console.debug('viewModelToDataModel - viewModel: ', viewModel);

        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel({'geo:siteLog':{}});

        siteLogDataModel.frequencyStandards = this.viewToDataModel(viewModel.frequencyStandards);
        siteLogDataModel.localEpisodicEffects = this.viewToDataModel(viewModel.localEpisodicEffects);
        siteLogDataModel.humiditySensors = this.viewToDataModel(viewModel.humiditySensors);
        siteLogDataModel.pressureSensors = this.viewToDataModel(viewModel.pressureSensors);
        siteLogDataModel.temperatureSensors = this.viewToDataModel(viewModel.temperatureSensors);
        siteLogDataModel.waterVaporSensors = this.viewToDataModel(viewModel.waterVaporSensors);

        siteLogDataModel.moreInformation = viewModel.moreInformation;
        siteLogDataModel.dataStreams = viewModel.dataStreams;

        _.merge(siteLogDataModel, siteLogMap.inverse().map(viewModel));

        console.debug('viewModelToDataModel - siteLogDataModel: ', siteLogDataModel);
        return siteLogDataModel;
    }

    /* ***************************** Helper functions ***************************** */
    /**
     * Translate data model to view model
     * @param dataModels - array of data model items to convert
     * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
     * @returns {AbstractViewModel[]} that is the super type of all view model types
     */
    private dataToViewModel<T extends AbstractViewModel>(dataModels: any[], type: {new(): T ;}): T[] {
        let viewModels: T[] = [];
        for (let dataModel of dataModels) {
            let newViewModel: T = new type();
            DataViewTranslatorService.translate(dataModel, newViewModel, newViewModel.getObjectMap());
            viewModels.push(newViewModel);
        }
        return viewModels;
    }

    /**
     * Translate view model to data model
     * @param viewModels - array of view model items to convert
     * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
     * @returns {any[]} - translated data model
     */
    private viewToDataModel<T extends AbstractViewModel>(viewModels: T[]): any[] {
        let dataModels: any[] = [];
        for (let viewModel of viewModels) {
            let objectMap = (<T> viewModel).getObjectMap();
            let dataModel: any = {};
            DataViewTranslatorService.translate(viewModel, dataModel, objectMap.inverse());
            dataModels.push(dataModel);
        }
        return dataModels;
    }
}
