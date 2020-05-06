import { Injectable } from '@angular/core';
import { SiteLogDataModel } from './data-model/site-log-data-model';
import { SiteLogViewModel } from '../../site-log/site-log-view-model';
import { ResponsiblePartyViewModel } from '../../responsible-party/responsible-party-view-model';
import { ObjectMap } from './object-map';
import * as _ from 'lodash';
import { MiscUtils } from '../global/misc-utils';
import { CartesianPosition, GeodeticPosition } from '../../site-information/site-location-view-model';

/* tslint:disable:max-line-length */

let dateMap = new ObjectMap().addSourcePostMap((source: string): string => {
    return source ? MiscUtils.formatUTCDateTime(source) : null;
});

let formInformationMap = new ObjectMap()
    .addFieldMap('preparedBy', 'preparedBy')
    .addFieldMap('datePrepared.value[0]', 'datePrepared', dateMap)
    .addFieldMap('reportType', 'reportType')
;

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
        return source && source.ciResponsibleParty ? source : null;
    })

    .addFieldMap('ciResponsibleParty.individualName.characterString.gco:CharacterString', 'individualName')
    .addFieldMap('ciResponsibleParty.organisationName.characterString.gco:CharacterString', 'organisationName')
    .addFieldMap('ciResponsibleParty.positionName.characterString.gco:CharacterString', 'positionName')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.deliveryPoint[].characterString.gco:CharacterString', 'deliveryPoint')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.city.characterString.gco:CharacterString', 'city')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.administrativeArea.characterString.gco:CharacterString', 'administrativeArea')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.postalCode.characterString.gco:CharacterString', 'postalCode')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.country.characterString.gco:CharacterString', 'country')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.address.ciAddress.electronicMailAddress[0].characterString.gco:CharacterString', 'email')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.phone.ciTelephone.voice[0].characterString.gco:CharacterString', 'primaryPhone')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.phone.ciTelephone.voice[1].characterString.gco:CharacterString', 'secondaryPhone')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.phone.ciTelephone.facsimile[0].characterString.gco:CharacterString', 'fax')
    .addFieldMap('ciResponsibleParty.contactInfo.ciContact.onlineResource', 'url', new ObjectMap()
        .addSourcePreMap((onlineResource: any): string => {
            return onlineResource ? onlineResource.ciOnlineResource.linkage.url : null;
        })
        .addSourcePostMap((onlineResource: string): any => {
            return onlineResource
                ? {
                      ciOnlineResource: {
                          linkage: {
                              url: onlineResource
                          }
                      }
                  }
                : null;
        })
    )
    .addSourcePostMap((source: any): any => {
        if (source && source.ciResponsibleParty) {
            source.ciResponsibleParty.role = {
                ciRoleCode : {
                    codeSpace: 'ISOTC211/19115',
                    codeList: 'http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode',
                    codeListValue: 'pointOfContact',
                    value: 'pointOfContact'
                }
            };
        }
        return source;
    })
    .addTargetPostMap((target: ResponsiblePartyViewModel): any => {
        if (target) {
            target.deliveryPoint = _.join(target.deliveryPoint, '\n');
        }
        return target;
    })
    .addSourcePostMap((source: any): any => {
        let address: any = _.get(source, 'ciResponsibleParty.contactInfo.ciContact.address.ciAddress');
        if (address && address.deliveryPoint) {
            let deliveryPointLine: string = address.deliveryPoint[0].characterString['gco:CharacterString'];
            let lines: string[] = _.split(deliveryPointLine, '\n');
            address.deliveryPoint = _.map(lines, (line: string): any => {
                 return {
                     characterString: {
                         'gco:CharacterString' : line
                     }
                 };
            });
        }
        return source;
    })
;
/* tslint:disable:max-line-length */

let gnssReceiverMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('gnssReceiver.dateInstalled.value[0]', 'startDate', dateMap)
    .addFieldMap('gnssReceiver.dateRemoved.value[0]', 'endDate', dateMap)

    .addFieldMap('gnssReceiver.igsModelCode.value', 'receiverType', new ObjectMap()
        .addTargetPreMap((receiverType: string) => receiverType ? receiverType.toUpperCase() : receiverType)
    )

    .addFieldMap('gnssReceiver.manufacturerSerialNumber', 'manufacturerSerialNumber')
    .addFieldMap('gnssReceiver.firmwareVersion', 'firmwareVersion')

    .addFieldMap('gnssReceiver.satelliteSystem', 'satelliteSystems', new ObjectMap()
        .addSourcePreMap((satelliteSystem: { value: string }) => { return satelliteSystem ? satelliteSystem.value : []; })
        .addSourcePostMap((satelliteSystem: string) => { return { value: satelliteSystem }; })
    )

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

    .addFieldMap('gnssAntenna.igsModelCode.value', 'antennaType', new ObjectMap()
        .addTargetPreMap((antennaType: string) => antennaType ? antennaType.toUpperCase() : antennaType)
    )

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
    .addFieldMap('surveyedLocalTie.differentialComponentsGNSSMarkerToTiedMonumentITRS.dx', 'differentialComponent.dx')
    .addFieldMap('surveyedLocalTie.differentialComponentsGNSSMarkerToTiedMonumentITRS.dy', 'differentialComponent.dy')
    .addFieldMap('surveyedLocalTie.differentialComponentsGNSSMarkerToTiedMonumentITRS.dz', 'differentialComponent.dz')
    .addFieldMap('surveyedLocalTie.dateMeasured.value[0]', 'startDate', dateMap)
    .addFieldMap('surveyedLocalTie.notes', 'notes')
;

let frequencyStandardMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('frequencyStandard.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('frequencyStandard.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('frequencyStandard.standardType.value', 'standardType')
    .addFieldMap('frequencyStandard.inputFrequency', 'inputFrequency')
    .addFieldMap('frequencyStandard.notes', 'notes')
;

let collocationInformationMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('collocationInformation.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('collocationInformation.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('collocationInformation.instrumentationType.value', 'instrumentationType')
    .addFieldMap('collocationInformation.status.value', 'status')
    .addFieldMap('collocationInformation.notes', 'notes')
;

let localEpisodicEffectMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('localEpisodicEffect.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('localEpisodicEffect.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('localEpisodicEffect.event', 'event')
;

let humiditySensorMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('humiditySensor.type.value', 'type')
    .addFieldMap('humiditySensor.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('humiditySensor.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('humiditySensor.calibrationDate.value[0]', 'calibrationDate', dateMap)
    .addFieldMap('humiditySensor.dataSamplingInterval', 'dataSamplingInterval')
    .addFieldMap('humiditySensor.accuracyPercentRelativeHumidity', 'accuracyPercentRelativeHumidity')
    .addFieldMap('humiditySensor.aspiration', 'aspiration')
    .addFieldMap('humiditySensor.manufacturer', 'manufacturer')
    .addFieldMap('humiditySensor.serialNumber', 'serialNumber')
    .addFieldMap('humiditySensor.heightDiffToAntenna', 'heightDiffToAntenna')
    .addFieldMap('humiditySensor.notes', 'notes')
;

let pressureSensorMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('pressureSensor.type.value', 'type')
    .addFieldMap('pressureSensor.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('pressureSensor.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('pressureSensor.calibrationDate.value[0]', 'calibrationDate', dateMap)
    .addFieldMap('pressureSensor.dataSamplingInterval', 'dataSamplingInterval')
    .addFieldMap('pressureSensor.accuracyHPa', 'accuracyHPa')
    .addFieldMap('pressureSensor.manufacturer', 'manufacturer')
    .addFieldMap('pressureSensor.serialNumber', 'serialNumber')
    .addFieldMap('pressureSensor.heightDiffToAntenna', 'heightDiffToAntenna')
    .addFieldMap('pressureSensor.notes', 'notes')
;

let temperatureSensorMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('temperatureSensor.type.value', 'type')
    .addFieldMap('temperatureSensor.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('temperatureSensor.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('temperatureSensor.calibrationDate.value[0]', 'calibrationDate', dateMap)
    .addFieldMap('temperatureSensor.dataSamplingInterval', 'dataSamplingInterval')
    .addFieldMap('temperatureSensor.accuracyDegreesCelcius', 'accuracyDegreesCelcius')
    .addFieldMap('temperatureSensor.manufacturer', 'manufacturer')
    .addFieldMap('temperatureSensor.serialNumber', 'serialNumber')
    .addFieldMap('temperatureSensor.heightDiffToAntenna', 'heightDiffToAntenna')
    .addFieldMap('temperatureSensor.aspiration', 'aspiration')
    .addFieldMap('temperatureSensor.notes', 'notes')
;

let waterVaporSensorMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('waterVaporSensor.type.value', 'type')
    .addFieldMap('waterVaporSensor.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('waterVaporSensor.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('waterVaporSensor.calibrationDate.value[0]', 'calibrationDate', dateMap)
    .addFieldMap('waterVaporSensor.manufacturer', 'manufacturer')
    .addFieldMap('waterVaporSensor.serialNumber', 'serialNumber')
    .addFieldMap('waterVaporSensor.heightDiffToAntenna', 'heightDiffToAntenna')
    .addFieldMap('waterVaporSensor.notes', 'notes')
;

let otherInstrumentationMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('otherInstrumentation.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('otherInstrumentation.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('otherInstrumentation.instrumentation', 'instrumentation')
;

let radioInterferenceMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('radioInterference.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('radioInterference.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('radioInterference.possibleProblemSource', 'possibleProblemSource')
    .addFieldMap('radioInterference.observedDegradation', 'observedDegradation')
    .addFieldMap('radioInterference.notes', 'notes')
;

let signalObstructionMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('signalObstruction.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('signalObstruction.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('signalObstruction.possibleProblemSource', 'possibleProblemSource')
    .addFieldMap('signalObstruction.notes', 'notes')
;

let multipathSourceMap = new ObjectMap()
    .addFieldMap('dateDeleted.value[0]', 'dateDeleted', dateMap)
    .addFieldMap('dateInserted.value[0]', 'dateInserted', dateMap)
    .addFieldMap('deletedReason', 'deletedReason')
    .addFieldMap('multipathSource.validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value[0]', 'startDate', dateMap)
    .addFieldMap('multipathSource.validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value[0]', 'endDate', dateMap)
    .addFieldMap('multipathSource.possibleProblemSource', 'possibleProblemSource')
    .addFieldMap('multipathSource.notes', 'notes')
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
    .addFieldMap('formInformation.formInformation', 'formInformation', formInformationMap)
    .addFieldMap('siteIdentification.siteIdentification', 'siteInformation.siteIdentification', siteIdentificationMap)
    .addFieldMap('siteLocation.siteLocation', 'siteInformation.siteLocation', siteLocationMap)

    .addFieldMap('siteOwner', 'siteOwner[0]', responsiblePartyMap)
    .addFieldMap('siteContacts', 'siteContacts', responsiblePartyMap)
    .addFieldMap('siteMetadataCustodian', 'siteMetadataCustodian[0]', responsiblePartyMap)
    .addFieldMap('siteDataCenters', 'siteDataCenters', responsiblePartyMap)
    .addFieldMap('siteDataSource', 'siteDataSource[0]', responsiblePartyMap)

    .addFieldMap('gnssReceivers', 'gnssReceivers', gnssReceiverMap)
    .addFieldMap('gnssAntennas', 'gnssAntennas', gnssAntennaMap)
    .addFieldMap('frequencyStandards', 'frequencyStandards', frequencyStandardMap)

    .addFieldMap('collocationInformation', 'collocationInformation', collocationInformationMap)

    .addFieldMap('surveyedLocalTies', 'surveyedLocalTies', surveyedLocalTieMap)
    .addFieldMap('localEpisodicEffects', 'localEpisodicEffects', localEpisodicEffectMap)

    .addFieldMap('humiditySensors', 'humiditySensors', humiditySensorMap)
    .addFieldMap('pressureSensors', 'pressureSensors', pressureSensorMap)
    .addFieldMap('temperatureSensors', 'temperatureSensors', temperatureSensorMap)
    .addFieldMap('waterVaporSensors', 'waterVaporSensors', waterVaporSensorMap)
    .addFieldMap('otherInstrumentation', 'otherInstrumentation', otherInstrumentationMap)

    .addFieldMap('radioInterferences', 'radioInterferences', radioInterferenceMap)
    .addFieldMap('signalObstructions', 'signalObstructions', signalObstructionMap)
    .addFieldMap('multipathSources', 'multipathSources', multipathSourceMap)

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


        siteLogDataModel.moreInformation = viewModel.moreInformation;
        siteLogDataModel.dataStreams = viewModel.dataStreams;

        _.merge(siteLogDataModel, siteLogMap.inverse().map(viewModel));

        console.debug('viewModelToDataModel - siteLogDataModel: ', siteLogDataModel);
        return siteLogDataModel;
    }
}
