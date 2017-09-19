import * as _ from 'lodash';
import { TestUtils } from '../utils/test.utils';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { GnssReceiverViewModel } from '../../../client/app/gnss-receiver/gnss-receiver-view-model';
import { GnssAntennaViewModel } from '../../../client/app/gnss-antenna/gnss-antenna-view-model';
import { PressureSensorViewModel } from '../../../client/app/pressure-sensor/pressure-sensor-view-model';
import { HumiditySensorViewModel } from '../../../client/app/humidity-sensor/humidity-sensor-view-model';
import { TemperatureSensorViewModel } from '../../../client/app/temperature-sensor/temperature-sensor-view-model';
import { WaterVaporSensorViewModel } from '../../../client/app/water-vapor-sensor/water-vapor-sensor-view-model';

const timestamp: string = TestUtils.getTimeStamp();
const commonItemFields: any = {
    id: null,
    startDate: null,
    endDate: null,
    dateInserted: null,
    dateDeleted: null,
    deletedReason: null,
    isDeleted: false
};

export const mockResponsibleParty: ResponsiblePartyViewModel = <ResponsiblePartyViewModel>_.extend({
    individualName: 'Homer Simpson',
    organisationName: 'Geoscience Australia',
    positionName: 'Manager ' + timestamp,
    deliveryPoint: 'Cnr Jerrabomberra Ave and Hindmarsh Drive\nSymonston, ACT\nAustralia',
    city: 'Symonston',
    administrativeArea: 'ACT',
    postalCode: '2609',
    country: 'Australia',
    email: 'Homer.Simpson@ga.gov.au',
    primaryPhone: '0262499997',
    secondaryPhone: '0262499998',
    fax: '0262499999',
    url: 'http://www.ga.gov.au',
}, commonItemFields);

export const mockGnssReceiver: GnssReceiverViewModel = <GnssReceiverViewModel>_.extend({
    receiverType: 'ASHTECH Z-XII3',
    satelliteSystems: [],
    manufacturerSerialNumber: '8888',
    firmwareVersion: '8Y08-8D08',
    elevationCutoffSetting: 5,
    temperatureStabilization: 10,
    notes: 'e2e testing - add a new receiver ' + timestamp,
}, commonItemFields);

export const mockGnssAntenna: GnssAntennaViewModel = <GnssAntennaViewModel>_.extend({
    antennaType: 'ASH700936B_L',
    serialNumber: '1616',
    antennaReferencePoint: 'BBPPAA',
    markerArpEastEcc: 1,
    markerArpUpEcc: 2,
    markerArpNorthEcc: 3,
    alignmentFromTrueNorth: 0,
    antennaRadomeType: 'SNOW_1',
    radomeSerialNumber: 'SNOW_Test',
    antennaCableType: 'SNOW_2',
    antennaCableLength: 100,
    notes: 'e2e testing - add a new antenna ' + timestamp,
}, commonItemFields);

export const meteorologicalSensorCommonProperties: any = {
    manufacturer: 'Vaisala',
    type: 'PTB110',
    serialNumber: 'P1110001',
    heightDiffToAntenna: 10,
    calibrationDate: '2017-08-08 10:20:30',
    notes: 'e2e testing - add a new item ' + timestamp
};

export const mockPressureSensor: PressureSensorViewModel = <PressureSensorViewModel>_.extend(meteorologicalSensorCommonProperties,
        { dataSamplingInterval: 600, accuracyHPa: 0.3 });
export const mockHumiditySensor: HumiditySensorViewModel = <HumiditySensorViewModel>_.extend(meteorologicalSensorCommonProperties,
        { dataSamplingInterval: 600, accuracyPercentRelativeHumidity: 0, aspiration: 'Natural' });
export const mockTemperatureSensor: TemperatureSensorViewModel = <TemperatureSensorViewModel>_.extend(meteorologicalSensorCommonProperties,
        { dataSamplingInterval: 600, accuracyDegreesCelcius: 0, aspiration: 'Natural' });
export const mockWaterVaporSensor: WaterVaporSensorViewModel = <WaterVaporSensorViewModel>meteorologicalSensorCommonProperties;
