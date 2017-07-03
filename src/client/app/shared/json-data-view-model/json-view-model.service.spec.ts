import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { JsonViewModelService, cartesianPositionMap, geodeticPositionMap } from './json-view-model.service';
import { JsonViewModelServiceSpecData } from './json-view-model.service.spec.data';
import { SiteLogViewModel } from './view-model/site-log-view-model';
import { SiteLogDataModel } from './data-model/site-log-data-model';
import { CartesianPosition, GeodeticPosition } from '../../site-information/site-location-view-model';

export function main() {
    let backend: MockBackend = null;
    let jsonViewModelService: JsonViewModelService;
    let completeValidSitelog: any = JsonViewModelServiceSpecData.data();

    describe('JsonViewModelService', () => {

        beforeEach(() => {

            let injector = ReflectiveInjector.resolveAndCreate([
                JsonViewModelService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function (backend: MockBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]);
            jsonViewModelService = injector.get(JsonViewModelService);
            backend = injector.get(MockBackend);
        });

        it('should be defined', () => {
            expect(jsonViewModelService).toBeDefined();
            expect(completeValidSitelog).toBeDefined();
        });

        it('should translate parts - data to view', () => {
            let siteLog: SiteLogViewModel = jsonViewModelService.dataModelToViewModel(completeValidSitelog);
            expect(siteLog).toBeDefined();

            let siteIdentification = siteLog.siteInformation.siteIdentification;
            expect(siteIdentification).toBeDefined();
            expect(siteIdentification.fourCharacterID).toEqual('ADE1');

            expect(siteLog.siteInformation.siteLocation).toBeDefined();
            expect(siteLog.siteInformation.siteLocation.city).toEqual('Salisbury');
            expect(siteLog.gnssReceivers).toBeDefined();
            expect(siteLog.gnssReceivers.length).not.toBe(0);
            expect(siteLog.gnssAntennas).toBeDefined();
            expect(siteLog.gnssAntennas.length).not.toBe(0);
            expect(siteLog.surveyedLocalTies).toBeDefined();
            expect(siteLog.surveyedLocalTies.length).not.toBe(0);
            expect(siteLog.frequencyStandards).toBeDefined();
            expect(siteLog.frequencyStandards.length).not.toBe(0);
            expect(siteLog.humiditySensors).toBeDefined();
            expect(siteLog.humiditySensors.length).not.toBe(0);
            expect(siteLog.humiditySensors[0].heightDiffToAntenna).toBe(0);
            expect(siteLog.humiditySensors[0].calibrationDate).toBe('2016-11-30T13:56:58.396Z');
            expect(siteLog.humiditySensors[0].accuracyPercentRelativeHumidity).toBe(22.22);
            expect(siteLog.humiditySensors[0].dataSamplingInterval).toBe(120);

            expect(siteLog.pressureSensors).toBeDefined();
            expect(siteLog.pressureSensors.length).not.toBe(0);
            expect(siteLog.temperatureSensors).toBeDefined();
            expect(siteLog.temperatureSensors.length).not.toBe(0);
            expect(siteLog.waterVaporSensors).toBeDefined();
            expect(siteLog.waterVaporSensors.length).not.toBe(0);
            expect(siteLog.siteOwner).toEqual([]);
            expect(siteLog.siteContacts).toBeDefined();
            expect(siteLog.siteMetadataCustodian).toBeDefined();
            expect(siteLog.siteDataSource).toEqual([]);
            expect(siteLog.moreInformation).toBeDefined();
            expect(siteLog.dataStreams).toBeDefined();
        });

        it('should translate parts - view to data', () => {
            let siteLogViewModel: SiteLogViewModel = jsonViewModelService.dataModelToViewModel(completeValidSitelog);
            let siteLogDataModel: SiteLogDataModel = jsonViewModelService.viewModelToDataModel(siteLogViewModel);

            expect(siteLogDataModel.humiditySensors).toBeDefined();
            expect(siteLogDataModel.humiditySensors.length).not.toBe(0);
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.heightDiffToAntenna).toBe(0);
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.calibrationDate.value[0]).toBe('2016-11-30T13:56:58.396Z');
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.accuracyPercentRelativeHumidity).toBe(22.22);
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.dataSamplingInterval).toBe(120);

            expect(siteLogDataModel.pressureSensors).toBeDefined();
            expect(siteLogDataModel.pressureSensors.length).not.toBe(0);
            expect(siteLogDataModel.temperatureSensors).toBeDefined();
            expect(siteLogDataModel.temperatureSensors.length).not.toBe(0);
            expect(siteLogDataModel.waterVaporSensors).toBeDefined();
            expect(siteLogDataModel.waterVaporSensors.length).not.toBe(0);
            expect(siteLogDataModel.siteOwner).toBeNull();
            expect(siteLogDataModel.siteContacts).toBeDefined();
            expect(siteLogDataModel.siteMetadataCustodian).toBeDefined();
            expect(siteLogDataModel.siteDataSource).toBeNull();
            expect(siteLogDataModel.moreInformation).toBeDefined();
            expect(siteLogDataModel.dataStreams).toBeDefined();
        });

        describe('Cartesian position object map', () => {
            it('should map data to view', () => {
                let cartesianPositionData = {
                    point: {
                        pos: {
                            value: [ 1, 2, 3 ]
                        }
                    }
                };
                let cartesianPositionView: CartesianPosition = cartesianPositionMap.map(cartesianPositionData);
                expect(cartesianPositionView.x).toBe(cartesianPositionData.point.pos.value[0]);
                expect(cartesianPositionView.y).toBe(cartesianPositionData.point.pos.value[1]);
                expect(cartesianPositionView.z).toBe(cartesianPositionData.point.pos.value[2]);
            });
            it('should map empty data to null coordinates', () => {
                let cartesianPositionData = {};
                let cartesianPositionView: CartesianPosition = cartesianPositionMap.map(cartesianPositionData);
                expect(cartesianPositionView.x).toBeNull();
                expect(cartesianPositionView.y).toBeNull();
                expect(cartesianPositionView.z).toBeNull();
            });
            it('should map undefined data to null coordinates', () => {
                let cartesianPositionView: any = cartesianPositionMap.map(undefined);
                expect(cartesianPositionView.x).toBeNull();
                expect(cartesianPositionView.y).toBeNull();
                expect(cartesianPositionView.z).toBeNull();
            });
            it('should map view to data', () => {
                let cartesianPositionView = new CartesianPosition(4, 5, 6);
                let cartesianPositionData: any = cartesianPositionMap.inverse().map(cartesianPositionView);
                expect(cartesianPositionData.point.pos.value[0]).toBe(cartesianPositionView.x);
                expect(cartesianPositionData.point.pos.value[1]).toBe(cartesianPositionView.y);
                expect(cartesianPositionData.point.pos.value[2]).toBe(cartesianPositionView.z);
            });
            it('should map incomplete view to null data', () => {
                let cartesianPositionView = new CartesianPosition(4, null, 6);
                let cartesianPositionData: any = cartesianPositionMap.inverse().map(cartesianPositionView);
                expect(cartesianPositionData).toBeNull();
            });
        });
        describe('Geodetic position object map', () => {
            it('should map data to view', () => {
                let geodeticPositionData = {
                    point: {
                        pos: {
                            value: [ 1, 2, 3 ]
                        }
                    }
                };
                let geodeticPositionView: GeodeticPosition = geodeticPositionMap.map(geodeticPositionData);
                expect(geodeticPositionView.lat).toBe(geodeticPositionData.point.pos.value[0]);
                expect(geodeticPositionView.lon).toBe(geodeticPositionData.point.pos.value[1]);
                expect(geodeticPositionView.height).toBe(geodeticPositionData.point.pos.value[2]);
            });
            it('should map empty data to null coordinates', () => {
                let geodeticPositionData = {};
                let geodeticPositionView: GeodeticPosition = geodeticPositionMap.map(geodeticPositionData);
                expect(geodeticPositionView.lat).toBeNull();
                expect(geodeticPositionView.lon).toBeNull();
                expect(geodeticPositionView.height).toBeNull();
            });
            it('should map undefined data to null coordinates', () => {
                let geodeticPositionView: any = geodeticPositionMap.map(undefined);
                expect(geodeticPositionView.lat).toBeNull();
                expect(geodeticPositionView.lon).toBeNull();
                expect(geodeticPositionView.height).toBeNull();
            });
            it('should map view to data', () => {
                let geodeticPositionView = new GeodeticPosition(4, 5, 6);
                let geodeticPositionData: any = geodeticPositionMap.inverse().map(geodeticPositionView);
                expect(geodeticPositionData.point.pos.value[0]).toBe(geodeticPositionView.lat);
                expect(geodeticPositionData.point.pos.value[1]).toBe(geodeticPositionView.lon);
                expect(geodeticPositionData.point.pos.value[2]).toBe(geodeticPositionView.height);
            });
            it('should map incomplete view to null data', () => {
                let geodeticPositionView = new GeodeticPosition(4, null, 6);
                let geodeticPositionData: any = geodeticPositionMap.inverse().map(geodeticPositionView);
                expect(geodeticPositionData).toBeNull();
            });
        });
    });
}
