import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { JsonCheckService } from './json-check.service';
import { MiscUtils } from './misc-utils';

export function main() {
    // No longer used (waiting to confirm)
  xdescribe('Test Json-Check Service ...', () => {
    let jsonCheckService: JsonCheckService;

    let receiverMissing: any = {
      manufacturerSerialNumber: 'be234',
      firmwareVersion: 'v1.2.3',
      satelliteSystem: [],
      elevationCutoffSetting: 5,
      temperatureStabilization: 'abc',
      dateInstalled: {},
      dateRemoved: {
        value: ['2016-01-01T12:34:65.000Z']
      },
      notes: 'Testing'
    };

    let receiverSatelliteUndefined: any = {
      manufacturerSerialNumber: 'be234',
      firmwareVersion: 'v1.2.3',
      satelliteSystem: undefined,
      elevationCutoffSetting: 5,
      temperatureStabilization: 'abc',
      dateInstalled: {},
      dateRemoved: {
        value: ['2016-01-01T12:34:65.000Z']
      },
      notes: 'Testing'
    };

    let antennaEmpty: any = {};

    let frequencyStdMissing: any = {
      standardType: {
        value: 'INTERNAL'
      },
      inputFrequency: 2,
      validTime: {
        abstractTimePrimitive: {
          'gml:TimePeriod': {
            beginPosition: {
              value: ['2016-01-01T12:34:65.000Z']
            }
          }
        }
      }
    };

    beforeEach(() => {
      let injector = ReflectiveInjector.resolveAndCreate([
        JsonCheckService,
        MiscUtils,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      jsonCheckService = injector.get(JsonCheckService);
    });

    it('should be defined', () => {
      expect(JsonCheckService).not.toBeUndefined();
    });

    it('should have a new Receiver object with all missing paths added', () => {
      let receiver: any = jsonCheckService.getValidReceiver(receiverMissing);
      expect(receiver).toBeDefined();
      expect(receiver.igsModelCode.value).toEqual('');
      expect(receiver.serialNumber).toEqual('');
      expect(receiver.dateInstalled.value.length).toEqual(1);
      expect(receiver.satelliteSystem[0].value).toEqual('');
    });

    it('should have a new Receiver object with receiver undefined', () => {
      let receiver: any = jsonCheckService.getValidReceiver(receiverSatelliteUndefined);
      expect(receiver).toBeDefined();
      expect(receiver.igsModelCode.value).toEqual('');
      expect(receiver.serialNumber).toEqual('');
      expect(receiver.dateInstalled.value.length).toEqual(1);
      expect(receiver.satelliteSystem[0].value).toEqual('');
    });

    it('should have a new Antenna object with all missing paths added', () => {
      let antenna: any = jsonCheckService.getValidAntenna(antennaEmpty);
      expect(antenna).toBeDefined();
      expect(antenna.antennaType.value).toEqual('');
      expect(antenna.serialNumber).toEqual('');
      expect(antenna.dateInstalled.value.length).toEqual(1);
      expect(antenna.antennaReferencePoint.value).toEqual('');
    });

    it('should have a new Frequency-Standard object with all missing paths added', () => {
      let frequencyStd: any = jsonCheckService.getValidFrequencyStandard(frequencyStdMissing);
      expect(frequencyStd).toBeDefined();
      expect(frequencyStd.standardType.value).toEqual('INTERNAL');
      expect(frequencyStd.notes).toEqual('');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod']
                          .beginPosition.value[0]).toEqual('2016-01-01T12:34:65.000Z');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value.length).toEqual(1);
    });
  });
}
