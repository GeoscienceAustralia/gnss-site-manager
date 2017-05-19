import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import * as lodash from 'lodash';

import { JsonDiffService, DiffItem, DiffType, NormalisedDiffs } from './json-diff.service';
import { HttpUtilsService } from './http-utils.service';
import { MiscUtils } from './misc-utils';
import { HumiditySensorViewModel } from '../../humidity-sensor/humidity-sensor-view-model';

export function main() {
  describe('Json Diff Service', () => {
    let jsonDiffService: JsonDiffService;
    let humiditySensor_old = {
      humiditySensors: [{
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1',
          serialNumber: 'P2240006',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-11-15T00:00:00.000Z',
          endDate: '',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        }
      }]
    };

    let humiditySensor_new_manufacturer = {
      humiditySensors: [{
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 new',
          serialNumber: 'P2240006',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-11-15T00:00:00.000Z',
          endDate: '',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
      }]
    };

    let humiditySensor_new_date = {
      humiditySensors: [{
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1',
          serialNumber: 'P2240006',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-11-16T00:00:00.000Z',
          endDate: '',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
      }]
    };

    let humiditySensor_new_manufacturer_date = {
      humiditySensors: [{
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 new',
          serialNumber: 'P2240006',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-11-16T00:00:00.000Z',
          endDate: '',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
      }]
    };

    let humiditySensor_1Sensors: any;
    let humiditySensor_1Sensors_source = {
      humiditySensors: [{
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 1',
          serialNumber: 'P2240006 1',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-10-01T00:00:00.000Z',
          endDate: '',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
      }]
    };

    let humiditySensor_2Sensors: any;
    let humiditySensor_2Sensors_source = {
      humiditySensors: [{
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 1',
          serialNumber: 'P2240006 1',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-10-01T00:00:00.000Z',
          endDate: '2016-10-31T00:00:00.000Z',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        }
      }, {
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 2',
          serialNumber: 'P2240006 2',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-11-01T00:00:00.000Z',
          endDate: '',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
      }]
    };

    let humiditySensor_3Sensors: any;
    let humiditySensor_3Sensors_source = {
      humiditySensors: [{
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 1',
          serialNumber: 'P2240006 1',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-10-01T00:00:00.000Z',
          endDate: '2016-10-31T00:00:00.000Z',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        }
      }, {
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 2',
          serialNumber: 'P2240006 2',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-11-01T00:00:00.000Z',
          endDate: '2016-11-30T00:00:00.000Z',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        }
      }, {
        humiditySensor: {
          dateInserted: '',
          dateDeleted: '',
          manufacturer: 'Vaisala1 3',
          serialNumber: 'P2240006 3',
          heightDiffToAntenna: 0,
          calibrationDate: '',
          startDate: '2016-12-01T00:00:00.000Z',
          endDate: '2016-12-31T00:00:00.000Z',
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
      }]
    };

    // To get data representing a removed item, clone the original eg. humiditySensor_3Sensors, and call
    // setDateDeleted(item.part, index)

    let receiver_old = {
      gnssReceivers: [{
        extension: {
          manufacturerName: '',
          manufacturerModel: '',
          manufacturerPartNumber: '',
          manufacturerDescription: '',
          manufacturerSerialNumber: '3213',
          igsModelCode: '',
          receiverType: 'ASHTECH Z-XII3',
          satelliteSystem: 'GPS',
          serialNumber: '',
          firmwareVersion: '1Y05-1D04',
          elevationCutoffSetting: 0,
          startDate: '1996-01-01T00:00:00.000Z',
          endDate: '1998-09-17T00:00:00.000Z',
          notes: 'Receiver 1'
        },
      }]
    };

    let receiver_new_receiverType = {
      gnssReceivers: [{
        extension: {
          manufacturerName: '',
          manufacturerModel: '',
          manufacturerPartNumber: '',
          manufacturerDescription: '',
          manufacturerSerialNumber: '3213',
          igsModelCode: '',
          receiverType: 'ASHTECH Z-XII3 new',
          satelliteSystem: 'GPS',
          serialNumber: '',
          firmwareVersion: '1Y05-1D04',
          elevationCutoffSetting: 0,
          startDate: '1996-01-01T00:00:00.000Z',
          endDate: '1998-09-17T00:00:00.000Z',
          notes: 'Receiver 1'
        },
      }]
    };

    // We won't (AFAIK) be dealing with additional and deleted fields though it is worth making sure we know
    // what to expect
    let receiver_new_newField = {
      gnssReceivers: [{
        extension: {
          manufacturerName: '',
          manufacturerModel: '',
          manufacturerPartNumber: '',
          manufacturerDescription: '',
          manufacturerSerialNumber: '3213',
          igsModelCode: '',
          receiverType: 'ASHTECH Z-XII3',
          satelliteSystem: 'GPS',
          serialNumber: '',
          firmwareVersion: '1Y05-1D04',
          elevationCutoffSetting: 0,
          startDate: '1996-01-01T00:00:00.000Z',
          endDate: '1998-09-17T00:00:00.000Z',
          notes: 'Receiver 1',
          newField: 'newFieldValue'
        },
      }]
    };


    let receiver_deletedField_notes = {
      gnssReceivers: [{
        extension: {
          manufacturerName: '',
          manufacturerModel: '',
          manufacturerPartNumber: '',
          manufacturerDescription: '',
          manufacturerSerialNumber: '3213',
          igsModelCode: '',
          receiverType: 'ASHTECH Z-XII3',
          satelliteSystem: 'GPS',
          serialNumber: '',
          firmwareVersion: '1Y05-1D04',
          elevationCutoffSetting: 0,
          startDate: '1996-01-01T00:00:00.000Z',
          endDate: '1998-09-17T00:00:00.000Z',
        },
      }]
    };

    let receiver_new_newField_and_deletedOne = {
      gnssReceivers: [{
        extension: {
          manufacturerName: '',
          manufacturerModel: '',
          manufacturerPartNumber: '',
          manufacturerDescription: '',
          manufacturerSerialNumber: '3213',
          igsModelCode: '',
          receiverType: 'ASHTECH Z-XII3',
          satelliteSystem: 'GPS',
          serialNumber: '',
          firmwareVersion: '1Y05-1D04',
          elevationCutoffSetting: 0,
          startDate: '1996-01-01T00:00:00.000Z',
          endDate: '1998-09-17T00:00:00.000Z',
          newField: 'newFieldValue'
        },
      }]
    };

    function clone(item: any): any {
      let cloneOf: any = lodash.cloneDeep(item);
      return cloneOf;
    }

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JsonDiffService,
        HttpUtilsService,
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
      jsonDiffService = injector.get(JsonDiffService);

      // prepare data for each test - done so as may modify at runtime
      humiditySensor_1Sensors = clone(humiditySensor_1Sensors_source);
      humiditySensor_2Sensors = clone(humiditySensor_2Sensors_source);
      humiditySensor_3Sensors = clone(humiditySensor_3Sensors_source);
    });

    it('should be defined', () => {
      expect(JsonDiffService).not.toBeUndefined();
    });

    /** Test the new diff library **/
    it('test jsondiff 2 humiditySensor manufacturer', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer);
      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(1);
      let diff: any = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('Vaisala1');
      expect(diff.rhs).toEqual('Vaisala1 new');
      expect(diff.path.length).toEqual(4);
      let path: string = diff.path.join('/');
      expect(path).toEqual('humiditySensors/0/humiditySensor/manufacturer');
    });

    it('test jsondiff 2 humiditySensor date', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_date);
      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(1);
      let diff: any = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('2016-11-15T00:00:00.000Z');
      expect(diff.rhs).toEqual('2016-11-16T00:00:00.000Z');
      expect(diff.path.length).toEqual(4);
      let path: string = diff.path.join('/');
      expect(path).toEqual('humiditySensors/0/humiditySensor/startDate');
    });

    it('test jsondiff 2 humiditySensor manufacturer AND date', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer_date);
      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(2);
      let diff: any = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('Vaisala1');
      expect(diff.rhs).toEqual('Vaisala1 new');
      expect(diff.path.length).toEqual(4);
      let path: string = diff.path.join('/');
      expect(path).toEqual('humiditySensors/0/humiditySensor/manufacturer');

      diff = diffs[1];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('2016-11-15T00:00:00.000Z');
      expect(diff.rhs).toEqual('2016-11-16T00:00:00.000Z');
      expect(diff.path.length).toEqual(4);
      path = diff.path.join('/');
      expect(path).toEqual('humiditySensors/0/humiditySensor/startDate');
    });

    it('test jsondiff 2 receiver', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_new_receiverType);
      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(1);
      let diff: any = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('ASHTECH Z-XII3');
      expect(diff.rhs).toEqual('ASHTECH Z-XII3 new');
      expect(diff.path.length).toEqual(4);
      let path: string = diff.path.join('/');
      expect(path).toEqual('gnssReceivers/0/extension/receiverType');
    });

    it('test jsondiff new field', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_new_newField);
      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(1);
      let diff: any = diffs[0];
      expect(diff.kind).toEqual('N');
      expect(diff.lhs).not.toBeDefined();
      expect(diff.rhs).toEqual('newFieldValue');
      expect(diff.path.length).toEqual(4);
      let path: string = diff.path.join('/');
      expect(path).toEqual('gnssReceivers/0/extension/newField');
    });

    it('test jsondiff deleted field', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_deletedField_notes);
      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(1);
      let diff: any = diffs[0];
      expect(diff.kind).toEqual('D');
      expect(diff.lhs).toEqual('Receiver 1');
      expect(diff.rhs).not.toBeDefined();
      expect(diff.path.length).toEqual(4);
      let path: string = diff.path.join('/');
      expect(path).toEqual('gnssReceivers/0/extension/notes');
    });

    it('test jsondiff deleted AND new field', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_new_newField_and_deletedOne);
      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(2);
      expect(diffs[0].kind).toEqual('D');
      expect(diffs[1].kind).toEqual('N');
    });

    // ---

    /**
     * When passed test data like - [{ humiditySensor: { ... }}, { humiditySensor: { ... }}], pull the index item
     * from that array and return the value of it's first object key eg. "humiditySensor".
     *
     * @param items
     * @param index
     * @return {any}
     */
    function getFirstObject(items: any[], index: number): any {
      if (items.length < index) {
        throw new Error('setDateInserted - there arent index # of items!  index: ' + index + ' items#: ' + items.length);
      }
      let item: any = items[index - 1];

      // should be only one object entry in item.  Regardless descend into the first
      let theObject: any = JsonDiffService.getTheObject(item);
      return theObject;
    }

    /**
     * Update the change tracking in some test data before using it.  Also set any 'endDate' to '' since it is new.
     * @param items is an array of items that should contain atleast index # of entries
     * @param index is a 1th based index (1,2,3,4,...) instead of 0
     * @return the date
     */
    function setDateInserted(items: any[], index: number): string {
      // should be only one object entry in item.  Regardless descend into the first
      let theObject: any = getFirstObject(items, index);

      let date: string = MiscUtils.getUTCDateTime();

      theObject.dateInserted = date;

      theObject.endDate = '';

      return date;
    }

    /**
     * Update the change tracking in some test data before using it.
     * @param items is an array of items that should contain atleast index # of entries
     * @param index is a 1th based index (1,2,3,4,...) instead of 0
     * @return the date
     */
    function setDateDeleted(items: any[], index: number): string {
      // should be only one object entry in item.  Regardless descend into the first
      let theObject: any = getFirstObject(items, index);

      let date: string = MiscUtils.getUTCDateTime();

      theObject.dateDeleted = date;

      return date;
    }

    it('test humidity sensor 1 add 2nd', () => {
      // Simulate what the app does
      let date: string = setDateInserted(humiditySensor_2Sensors.humiditySensors, 2);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_2Sensors);
      let diff: any;
      let path: string;

      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(2);

      diff = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('');
      expect(diff.rhs).toEqual('2016-10-31T00:00:00.000Z');
      expect(diff.path.length).toEqual(4);
      path = diff.path.join('/');
      expect(path).toEqual('humiditySensors/0/humiditySensor/endDate');

      diff = diffs[1];
      expect(diff.kind).toEqual('A');                   // diff happened within an array
      expect(diff.index).toEqual(1);                    // diff happened at index 1
      expect(diff.path.length).toEqual(1);
      expect(diff.path[0]).toEqual('humiditySensors');  // is the array
      let diffItem: any = diff.item;                    // the different array item
      expect(diffItem).toBeDefined();
      expect(diffItem.kind).toEqual('N');	              // Diff is a 'New' array entry
      expect(diffItem.lhs).not.toBeDefined();
      expect(diffItem.rhs).toBeDefined();
      expect(diffItem.rhs.humiditySensor).toBeDefined();
      expect(diffItem.rhs.humiditySensor.manufacturer).toEqual('Vaisala1 2');
      expect(diffItem.rhs.humiditySensor.dateInserted).toEqual(date);
    });

    it('test humidity sensor 1 add 2nd, 3rd', () => {
      // Simulate what the app does
      let date1: string = setDateInserted(humiditySensor_3Sensors.humiditySensors, 2);
      let date2: string = setDateInserted(humiditySensor_3Sensors.humiditySensors, 3);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_3Sensors);
      let diff: any;
      let path: string;
      let diffItem: any;
      console.log('test humidity sensor 1 add 2 - data:');
      console.log('  humiditySensor_1Sensors: ', humiditySensor_1Sensors);
      console.log('  humiditySensor_3Sensors: ', humiditySensor_3Sensors);

      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(3);

      diff = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('');
      expect(diff.rhs).toEqual('2016-10-31T00:00:00.000Z');
      expect(diff.path.length).toEqual(4);
      path = diff.path.join('/');
      expect(path).toEqual('humiditySensors/0/humiditySensor/endDate');

      diff = diffs[1];
      expect(diff.kind).toEqual('A');                   // diff happened within an array
      expect(diff.index).toEqual(1);                    // diff happened at index 1
      expect(diff.path.length).toEqual(1);
      expect(diff.path[0]).toEqual('humiditySensors');  // is the array
      diffItem = diff.item;                    // the different array item
      expect(diffItem).toBeDefined();
      expect(diffItem.kind).toEqual('N');	              // Diff is a 'New' array entry
      expect(diffItem.lhs).not.toBeDefined();
      expect(diffItem.rhs).toBeDefined();
      expect(diffItem.rhs.humiditySensor).toBeDefined();
      expect(diffItem.rhs.humiditySensor.manufacturer).toEqual('Vaisala1 2');
      expect(diffItem.rhs.humiditySensor.dateInserted).toEqual(date1);

      diff = diffs[2];
      expect(diff.kind).toEqual('A');                   // diff happened within an array
      expect(diff.index).toEqual(2);                    // diff happened at index 1
      expect(diff.path.length).toEqual(1);
      expect(diff.path[0]).toEqual('humiditySensors');  // is the array
      diffItem = diff.item;                    // the different array item
      expect(diffItem).toBeDefined();
      expect(diffItem.kind).toEqual('N');	              // Diff is a 'New' array entry
      expect(diffItem.lhs).not.toBeDefined();
      expect(diffItem.rhs).toBeDefined();
      expect(diffItem.rhs.humiditySensor).toBeDefined();
      expect(diffItem.rhs.humiditySensor.manufacturer).toEqual('Vaisala1 3');
      expect(diffItem.rhs.humiditySensor.dateInserted).toEqual(date2);
    });

    /**
     * Removing a middle item doesn't happen nicely when done purely with diff since for example, removing the 2nd
     * of 3 items just does a diff of what was the 3rd against the previous 2nd (and so get field by field diffs).
     *
     * Instead the app will use the change tracking mechanism to mark it as Deleted but it will still exist.  Upon
     * persisting the data, what is marked as Deleted needs to be removed first.
     */

    it('test humidity sensor - were 3 remove 3rd', () => {
      let humiditySensor_3Sensors_3rdRemoved: any = clone(humiditySensor_3Sensors);
      // Simulate what the app does
      let date: string = setDateDeleted(humiditySensor_3Sensors_3rdRemoved.humiditySensors, 3);
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_3Sensors, humiditySensor_3Sensors_3rdRemoved);
      let diff: any;
      let path: string;

      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(1);

      diff = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('');
      expect(diff.rhs).toEqual(date);
      expect(diff.path.length).toEqual(4);
      path = diff.path.join('/');
      expect(path).toEqual('humiditySensors/2/humiditySensor/dateDeleted');
    });

    it('test humidity sensor - were 3 remove 2nd, 3rd', () => {
      let humiditySensor_3Sensors_Remove2nd3rd: any = clone(humiditySensor_3Sensors);
      // Simulate what the app does
      let date1: string = setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 2);
      let date2: string = setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 3);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_3Sensors, humiditySensor_3Sensors_Remove2nd3rd);
      let diff: any;
      let path: string;

      expect(diffs).toBeDefined();
      expect(diffs.length).toEqual(2);

      diff = diffs[0];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('');
      expect(diff.rhs).toEqual(date1);
      expect(diff.path.length).toEqual(4);
      path = diff.path.join('/');
      expect(path).toEqual('humiditySensors/1/humiditySensor/dateDeleted');

      diff = diffs[1];
      expect(diff.kind).toEqual('E');
      expect(diff.lhs).toEqual('');
      expect(diff.rhs).toEqual(date2);
      expect(diff.path.length).toEqual(4);
      path = diff.path.join('/');
      expect(path).toEqual('humiditySensors/2/humiditySensor/dateDeleted');
    });

    /* NOW TEST our intermediate data structure */

    it('test getItem(), getPath()', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer);
      expect(jsonDiffService.getItem(diffs[0])).toEqual('manufacturer');
      expect(jsonDiffService.getPath(diffs[0])).toEqual('/humiditySensors/0/humiditySensor/manufacturer');
      expect(jsonDiffService.getPathToItem(diffs[0])).toEqual('/humiditySensors/0/humiditySensor');
    });

    it('test getIdentifier()', () => {
      let ident = jsonDiffService.getIdentifier(jsonDiffService.getObject(humiditySensor_1Sensors, '/humiditySensors/0/humiditySensor'));
      expect(ident).toBeDefined();
      expect(ident).toEqual(MiscUtils.getDateComponent('2016-10-01T00:00:00.000Z'));
    });

    it('test getIdentifier() 2', () => {
      let ident = jsonDiffService.getIdentifier(jsonDiffService.getObject(humiditySensor_2Sensors, '/humiditySensors/0/humiditySensor'));
      expect(ident).toBeDefined();
      expect(ident).toEqual(MiscUtils.getDateComponent('2016-10-01T00:00:00.000Z') + ' &ndash; ' +
        MiscUtils.getDateComponent('2016-10-31T00:00:00.000Z'));
    });

    it('test humidity sensor intermediate diff - Edit manufacturer', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_old, humiditySensor_new_manufacturer);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(1);

      let diffItem: DiffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('2016-11-15T00:00:00.000Z'));
      expect(diffItem.item).toEqual('manufacturer');
      expect(diffItem.oldValue).toEqual('Vaisala1');
      expect(diffItem.newValue).toEqual('Vaisala1 new');
    });

    it('test humidity sensor intermediate diff - Edit date', () => {
      // let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_date);
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_date);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_old, humiditySensor_new_date);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(1);

      let diffItem: DiffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('2016-11-16T00:00:00.000Z'));
      expect(diffItem.item).toEqual('startDate');
      expect(diffItem.oldValue).toEqual('2016-11-15T00:00:00.000Z');
      expect(diffItem.newValue).toEqual('2016-11-16T00:00:00.000Z');
    });

    it('test humidity sensor intermediate diff - Edit manufacturer AND date', () => {
      // let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer_date);
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer_date);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_old, humiditySensor_new_manufacturer_date);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(2);

      let diffItem: DiffItem = intDiffs[1];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('2016-11-16T00:00:00.000Z'));
      expect(diffItem.item).toEqual('startDate');
      expect(diffItem.oldValue).toEqual('2016-11-15T00:00:00.000Z');
      expect(diffItem.newValue).toEqual('2016-11-16T00:00:00.000Z');

      diffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('2016-11-16T00:00:00.000Z'));
      expect(diffItem.item).toEqual('manufacturer');
      expect(diffItem.oldValue).toEqual('Vaisala1');
      expect(diffItem.newValue).toEqual('Vaisala1 new');
    });

    it('test humidity sensor intermediate diff - new field', () => {
      // let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_new_newField);
      let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_new_newField);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, receiver_old, receiver_new_newField);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(1);

      let diffItem: DiffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.New);
      expect(diffItem.container).toEqual('gnssReceivers');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('1996-01-01T00:00:00.000Z') + ' &ndash; ' +
        MiscUtils.getDateComponent('1998-09-17T00:00:00.000Z'));
      expect(diffItem.item).toEqual('newField');
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual('newFieldValue');
    });

    it('test jsondiff deleted field', () => {
      // let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_deletedField_notes);
      let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_deletedField_notes);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, receiver_old, receiver_deletedField_notes);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(1);

      let diffItem: DiffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.Deleted);
      expect(diffItem.container).toEqual('gnssReceivers');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('1996-01-01T00:00:00.000Z') + ' &ndash; ' +
        MiscUtils.getDateComponent('1998-09-17T00:00:00.000Z'));
      expect(diffItem.item).toEqual('notes');
      expect(diffItem.oldValue).toEqual('Receiver 1');
      expect(diffItem.newValue).toEqual('');
    });

    it('test jsondiff deleted AND new field', () => {
      // let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_new_newField_and_deletedOne);
      let diffs: any[] = jsonDiffService.getJsonDiff(receiver_old, receiver_new_newField_and_deletedOne);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, receiver_old, receiver_new_newField_and_deletedOne);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(2);

      let diffItem: DiffItem = intDiffs[1];

      expect(diffItem.diffType).toEqual(DiffType.New);
      expect(diffItem.container).toEqual('gnssReceivers');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('1996-01-01T00:00:00.000Z') + ' &ndash; ' +
        MiscUtils.getDateComponent('1998-09-17T00:00:00.000Z'));
      expect(diffItem.item).toEqual('newField');
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual('newFieldValue');

      diffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.Deleted);
      expect(diffItem.container).toEqual('gnssReceivers');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('1996-01-01T00:00:00.000Z') + ' &ndash; ' +
        MiscUtils.getDateComponent('1998-09-17T00:00:00.000Z'));
      expect(diffItem.item).toEqual('notes');
      expect(diffItem.oldValue).toEqual('Receiver 1');
      expect(diffItem.newValue).toEqual('');
    });

    /* *** Now test arrays and diff - insert, delete, edit *** */
    it('arrays test humidity sensor 1 add 2nd', () => {
      // Simulate what the app does
      let date: string = setDateInserted(humiditySensor_2Sensors.humiditySensors, 2);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_2Sensors);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_1Sensors, humiditySensor_2Sensors);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(2);

      let diffItem: DiffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.item).toEqual('endDate');
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual('2016-10-31T00:00:00.000Z');


      diffItem = intDiffs[1];

      expect(diffItem.diffType).toEqual(DiffType.NewArrayItem);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.item).toEqual(1);
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toBeDefined();
      let humiditySensor: HumiditySensorViewModel = <HumiditySensorViewModel> diffItem.newValue.humiditySensor;
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent(humiditySensor.startDate));
      console.log('humiditySensor new item:', humiditySensor);
      expect(humiditySensor.manufacturer).toEqual('Vaisala1 2');
      expect(humiditySensor.serialNumber).toEqual('P2240006 2');
      expect(humiditySensor.dateInserted).toEqual(date);
    });

    it('arrays test humidity sensor 1 add 2nd, 3rd', () => {
      // Simulate what the app does
      let date1: string = setDateInserted(humiditySensor_3Sensors.humiditySensors, 2);
      let date2: string = setDateInserted(humiditySensor_3Sensors.humiditySensors, 3);
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_3Sensors);

      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_1Sensors, humiditySensor_3Sensors);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(3);

      let diffItem: DiffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.item).toEqual('endDate');
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual('2016-10-31T00:00:00.000Z');

      diffItem = intDiffs[1];
      expect(diffItem.diffType).toEqual(DiffType.NewArrayItem);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.item).toEqual(1);
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toBeDefined();
      let humiditySensor: HumiditySensorViewModel = <HumiditySensorViewModel> diffItem.newValue.humiditySensor;
      console.log('humiditySensor new item:', humiditySensor);
      expect(humiditySensor.manufacturer).toEqual('Vaisala1 2');
      expect(humiditySensor.serialNumber).toEqual('P2240006 2');
      expect(humiditySensor.dateInserted).toEqual(date1);
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent(humiditySensor.startDate));

      diffItem = intDiffs[2];
      expect(diffItem.diffType).toEqual(DiffType.NewArrayItem);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.item).toEqual(2);
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toBeDefined();
      humiditySensor = <HumiditySensorViewModel> diffItem.newValue.humiditySensor;
      console.log('humiditySensor new item:', humiditySensor);
      expect(humiditySensor.manufacturer).toEqual('Vaisala1 3');
      expect(humiditySensor.serialNumber).toEqual('P2240006 3');
      expect(humiditySensor.dateInserted).toEqual(date2);
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent(humiditySensor.startDate));
    });

    it('arrays test humidity sensor - were 3 remove 3rd', () => {
      let humiditySensor_3Sensors_Remove3rd: any = clone(humiditySensor_3Sensors);
      // Simulate what the app does
      let date: string = setDateDeleted(humiditySensor_3Sensors_Remove3rd.humiditySensors, 3);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_3Sensors, humiditySensor_3Sensors_Remove3rd);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_3Sensors, humiditySensor_3Sensors_Remove3rd);

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(1);

      let diffItem: DiffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.DeletedArrayItem);
      expect(diffItem.item).toEqual('dateDeleted');
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual(date);
    });

    it('arrays test humidity sensor - were 3 remove 2nd, 3rd', () => {
      let humiditySensor_3Sensors_Remove2nd3rd: any = clone(humiditySensor_3Sensors);
      // Simulate what the app does
      let date1: string = setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 2);
      let date2: string = setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 3);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_3Sensors, humiditySensor_3Sensors_Remove2nd3rd);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_3Sensors,
        humiditySensor_3Sensors_Remove2nd3rd);
      let diffItem: DiffItem;

      expect(intDiffs).toBeDefined();
      expect(intDiffs.length).toEqual(2);

      diffItem = intDiffs[0];

      expect(diffItem.diffType).toEqual(DiffType.DeletedArrayItem);
      expect(diffItem.item).toEqual('dateDeleted');
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual(date1);

      diffItem = intDiffs[1];

      expect(diffItem.diffType).toEqual(DiffType.DeletedArrayItem);
      expect(diffItem.item).toEqual('dateDeleted');
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual(date2);
    });

    /* ****** Now test the normalised data structure (between intermediate and final output) ****** */

    it('normalised test humidity sensor intermediate diff - Edit manufacturer', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_old, humiditySensor_new_manufacturer);
      let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);

      expect(normalDiffs).toBeDefined();
      expect(normalDiffs.values).toBeDefined();
      // let keys: string[] = Object.keys(normalDiffs.values);
      expect(normalDiffs.values.size).toEqual(1);

      let nd: [string, Array<DiffItem>] = normalDiffs.values.entries().next().value;

      expect(nd).toBeDefined();

      let identifier: string = nd[0];
      expect(identifier).toContain(
        MiscUtils.getDateComponent(humiditySensor_new_manufacturer.humiditySensors[0].humiditySensor.startDate));

      let diffItems: DiffItem[] = nd[1];
      expect(diffItems.length).toEqual(1);

      let diffItem: DiffItem = diffItems[0];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('2016-11-15T00:00:00.000Z'));
      expect(diffItem.item).toEqual('manufacturer');
      expect(diffItem.oldValue).toEqual('Vaisala1');
      expect(diffItem.newValue).toEqual('Vaisala1 new');
    });

    it('normalised test jsondiff 2 humiditySensor manufacturer AND date', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer_date);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_old, humiditySensor_new_manufacturer_date);
      let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);

      expect(normalDiffs).toBeDefined();
      expect(normalDiffs.values).toBeDefined();
      // let keys: string[] = Object.keys(normalDiffs.values);
      expect(normalDiffs.values.size).toEqual(1);

      let nd: [string, Array<DiffItem>] = normalDiffs.values.entries().next().value;

      expect(nd).toBeDefined();
      let identifier: string = nd[0];
      let diffItems: DiffItem[] = nd[1];

      expect(identifier).toContain(
        MiscUtils.getDateComponent(humiditySensor_new_manufacturer_date.humiditySensors[0].humiditySensor.startDate));

      expect(diffItems.length).toEqual(2);
      let diffItem: DiffItem = diffItems[1];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('2016-11-16T00:00:00.000Z'));
      expect(diffItem.item).toEqual('startDate');
      expect(diffItem.oldValue).toEqual('2016-11-15T00:00:00.000Z');
      expect(diffItem.newValue).toEqual('2016-11-16T00:00:00.000Z');

      diffItem = diffItems[0];

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent('2016-11-16T00:00:00.000Z'));
      expect(diffItem.item).toEqual('manufacturer');
      expect(diffItem.oldValue).toEqual('Vaisala1');
      expect(diffItem.newValue).toEqual('Vaisala1 new');
    });

    it('normalised test humidity sensor 1 add 2nd', () => {
      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_2Sensors);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_1Sensors, humiditySensor_2Sensors);
      let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
      let diffEntries: IterableIterator<[string, Array<DiffItem>]>;
      let nextContainerDiff: IteratorResult<[string, Array<DiffItem>]>;
      let mapKey: string;
      let diffItems: DiffItem[];
      let diffItem: DiffItem;

      expect(normalDiffs).toBeDefined();
      expect(normalDiffs.values).toBeDefined();
      expect(normalDiffs.values.size).toEqual(2);

      diffEntries = normalDiffs.values.entries();

      /* ******************** 1 ************************** */
      nextContainerDiff = diffEntries.next();
      expect(nextContainerDiff).toBeDefined();
      mapKey = nextContainerDiff.value[0];
      diffItems = nextContainerDiff.value[1];

      // mapKey looks something like 'container => identifier' eg. 'HumiditySensors=>2016-12-01..._to_2016-12-31...'
      console.log('mapKey: ', mapKey);
      expect(mapKey).toContain('humiditySensor');
      expect(mapKey).toContain(MiscUtils.getDateComponent(humiditySensor_2Sensors.humiditySensors[0].humiditySensor.startDate));
      expect(mapKey).toContain(MiscUtils.getDateComponent(humiditySensor_2Sensors.humiditySensors[0].humiditySensor.endDate));

      expect(diffItems.length).toEqual(1);
      diffItem = diffItems[0];

      // mapKey is built from these parts
      expect(mapKey).toContain(diffItem.identifier);
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);
      expect(mapKey).toContain(diffItem.container);

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual('2016-10-31T00:00:00.000Z');

      /* ******************** 2 ************************** */
      nextContainerDiff = diffEntries.next();
      expect(nextContainerDiff).toBeDefined();
      mapKey = nextContainerDiff.value[0];
      diffItems = nextContainerDiff.value[1];

      // mapKey looks something like 'container => identifier' eg. 'HumiditySensors=><start date>'
      console.log('mapKey: ', mapKey);
      expect(mapKey).toContain('humiditySensor');
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);

      expect(diffItems.length).toEqual(1);
      diffItem = diffItems[0];

      // mapKey is built from these parts
      expect(mapKey).toContain(diffItem.identifier);
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);
      expect(mapKey).toContain(diffItem.container);

      // The difference is the added humidity sensor
      expect(diffItem.diffType).toEqual(DiffType.NewArrayItem);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.item).toEqual(1);
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toBeDefined();
      let humiditySensor: HumiditySensorViewModel = <HumiditySensorViewModel> diffItem.newValue.humiditySensor;
      console.log('humiditySensor new item:', humiditySensor);
      expect(humiditySensor.manufacturer).toEqual('Vaisala1 2');
      expect(humiditySensor.serialNumber).toEqual('P2240006 2');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent(humiditySensor.startDate));
    });

    it('normalised test humidity sensor 1 add 2nd, 3rd', () => {
      // Simulate what the app does
      setDateInserted(humiditySensor_3Sensors.humiditySensors, 2);
      setDateInserted(humiditySensor_3Sensors.humiditySensors, 3);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_3Sensors);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_1Sensors, humiditySensor_3Sensors);

      let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
      let diffEntries: IterableIterator<[string, Array<DiffItem>]>;
      let nextContainerDiff: IteratorResult<[string, Array<DiffItem>]>;
      let mapKey: string;
      let diffItems: DiffItem[];
      let diffItem: DiffItem;

      expect(normalDiffs).toBeDefined();
      expect(normalDiffs.values).toBeDefined();
      expect(normalDiffs.values.size).toEqual(3); // comment

      diffEntries = normalDiffs.values.entries();

      /* ******************** 1 ************************** */
      nextContainerDiff = diffEntries.next();
      expect(nextContainerDiff).toBeDefined();
      mapKey = nextContainerDiff.value[0];
      diffItems = nextContainerDiff.value[1];

      // mapKey looks something like 'container => identifier' eg. 'HumiditySensors=>2016-12-01..._to_2016-12-31...'
      console.log('mapKey: ', mapKey);
      expect(mapKey).toContain('humiditySensor');
      expect(mapKey).toContain(MiscUtils.getDateComponent(humiditySensor_3Sensors.humiditySensors[0].humiditySensor.startDate));
      expect(mapKey).toContain(MiscUtils.getDateComponent(humiditySensor_3Sensors.humiditySensors[0].humiditySensor.endDate));

      expect(diffItems.length).toEqual(1);
      diffItem = diffItems[0];

      // mapKey is built from these parts
      expect(mapKey).toContain(diffItem.identifier);
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);
      expect(mapKey).toContain(diffItem.container);

      expect(diffItem.diffType).toEqual(DiffType.Edited);
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual('2016-10-31T00:00:00.000Z');

      /* ******************** 2 ************************** */
      nextContainerDiff = diffEntries.next();
      expect(nextContainerDiff).toBeDefined();
      mapKey = nextContainerDiff.value[0];
      diffItems = nextContainerDiff.value[1];

      // mapKey looks something like 'container => identifier' eg. 'HumiditySensors=><startDate>'
      console.log('mapKey: ', mapKey);
      expect(mapKey).toContain('humiditySensor');
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);

      expect(diffItems.length).toEqual(1);
      diffItem = diffItems[0];

      // mapKey is built from these parts
      expect(mapKey).toContain(diffItem.identifier);
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);
      expect(mapKey).toContain(diffItem.container);

      // The difference is the added humidity sensor
      expect(diffItem.diffType).toEqual(DiffType.NewArrayItem);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.item).toEqual(1);
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toBeDefined();
      let humiditySensor: HumiditySensorViewModel = <HumiditySensorViewModel> diffItem.newValue.humiditySensor;
      console.log('humiditySensor new item:', humiditySensor);
      expect(humiditySensor.manufacturer).toEqual('Vaisala1 2');
      expect(humiditySensor.serialNumber).toEqual('P2240006 2');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent(humiditySensor.startDate));

      /* ******************** 3 ************************** */
      nextContainerDiff = diffEntries.next();
      expect(nextContainerDiff).toBeDefined();
      mapKey = nextContainerDiff.value[0];
      diffItems = nextContainerDiff.value[1];

      // mapKey looks something like 'container => identifier' eg. 'HumiditySensors=><startDate'
      console.log('mapKey: ', mapKey);
      expect(mapKey).toContain('humiditySensor');
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);

      expect(diffItems.length).toEqual(1);
      diffItem = diffItems[0];

      // mapKey is built from these parts
      expect(mapKey).toContain(diffItem.identifier);
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);
      expect(mapKey).toContain(diffItem.container);

      // The difference is the added humidity sensor
      expect(diffItem.diffType).toEqual(DiffType.NewArrayItem);
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.item).toEqual(2); // index
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toBeDefined();
      humiditySensor = <HumiditySensorViewModel> diffItem.newValue.humiditySensor;
      console.log('humiditySensor new item:', humiditySensor);
      expect(humiditySensor.manufacturer).toEqual('Vaisala1 3');
      expect(humiditySensor.serialNumber).toEqual('P2240006 3');
      expect(diffItem.identifier).toEqual(MiscUtils.getDateComponent(humiditySensor.startDate));
    });

    it('normalised test humidity sensor - were 3 remove 2nd, 3rd', () => {
      let humiditySensor_3Sensors_Remove2nd3rd: any = clone(humiditySensor_3Sensors);
      // Simulate what the app does
      let date1: string = setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 2);
      let date2: string = setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 3);

      let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_3Sensors, humiditySensor_3Sensors_Remove2nd3rd);
      let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_3Sensors,
        humiditySensor_3Sensors_Remove2nd3rd);

      let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
      let diffEntries: IterableIterator<[string, Array<DiffItem>]>;
      let nextContainerDiff: IteratorResult<[string, Array<DiffItem>]>;
      let mapKey: string;
      let diffItems: DiffItem[];
      let diffItem: DiffItem;

      expect(normalDiffs).toBeDefined();
      expect(normalDiffs.values).toBeDefined();
      expect(normalDiffs.values.size).toEqual(2); // comment

      diffEntries = normalDiffs.values.entries();

      /* ******************** 1 ************************** */
      nextContainerDiff = diffEntries.next();
      expect(nextContainerDiff).toBeDefined();
      mapKey = nextContainerDiff.value[0];
      diffItems = nextContainerDiff.value[1];

      // mapKey looks something like 'container => identifier' eg. 'HumiditySensors=>2016-12-01..._to_2016-12-31...'
      console.log('mapKey: ', mapKey);
      expect(mapKey).toContain('humiditySensor');
      expect(mapKey).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[1].humiditySensor.startDate));
      expect(mapKey).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[1].humiditySensor.endDate));

      expect(diffItems.length).toEqual(1);
      diffItem = diffItems[0];

      // mapKey is built from these parts
      expect(mapKey).toContain(diffItem.identifier);
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);
      expect(mapKey).toContain(diffItem.container);

      expect(diffItem.diffType).toEqual(DiffType.DeletedArrayItem);
      expect(diffItem.item).toEqual('dateDeleted');
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[1].humiditySensor.startDate));
      expect(diffItem.identifier).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[1].humiditySensor.endDate));
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual(date1);

      /* ******************** 2 ************************** */
      nextContainerDiff = diffEntries.next();
      expect(nextContainerDiff).toBeDefined();
      mapKey = nextContainerDiff.value[0];
      diffItems = nextContainerDiff.value[1];

      // mapKey looks something like 'container => identifier' eg. 'HumiditySensors=>new item X'
      console.log('mapKey: ', mapKey);
      expect(mapKey).toContain('humiditySensor');
      expect(mapKey).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[2].humiditySensor.startDate));
      expect(mapKey).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[2].humiditySensor.endDate));

      expect(diffItems.length).toEqual(1);
      diffItem = diffItems[0];

      // mapKey is built from these parts
      expect(mapKey).toContain(diffItem.identifier);
      expect(mapKey).toContain(JsonDiffService.mapKeySeparator);
      expect(mapKey).toContain(diffItem.container);

      // The difference is the added humidity sensor
      expect(diffItem.diffType).toEqual(DiffType.DeletedArrayItem);
      expect(diffItem.item).toEqual('dateDeleted');
      expect(diffItem.container).toEqual('humiditySensors');
      expect(diffItem.identifier).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[2].humiditySensor.startDate));
      expect(diffItem.identifier).toContain(
        MiscUtils.getDateComponent(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors[2].humiditySensor.endDate));
      expect(diffItem.oldValue).toEqual('');
      expect(diffItem.newValue).toEqual(date2);
    });

    /* ****** TEST Building the HTML Table ****** */

    describe('test building HTML tables', () => {
      it('table from normalised test humidity sensor intermediate diff - Edit manufacturer', () => {
        let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer);
        let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_old, humiditySensor_new_manufacturer);
        let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
        let table: string = jsonDiffService.getJsonDiffsTable(normalDiffs);

        expect(table.length > 0);

        console.log('table - edit manufacturer: ', table);
      });

      it('table from normalised test jsondiff 2 humiditySensor new manufacturer AND date', () => {
        let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_old, humiditySensor_new_manufacturer_date);
        let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_old, humiditySensor_new_manufacturer_date);
        let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
        let table: string = jsonDiffService.getJsonDiffsTable(normalDiffs);

        expect(table.length > 0);

        console.log('table - new manufacturer AND date: ', table);
      });

      it('table from normalised test humidity sensor 1 add 2nd', () => {
        let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_2Sensors);
        let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_1Sensors, humiditySensor_2Sensors);
        let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
        let table: string = jsonDiffService.getJsonDiffsTable(normalDiffs);

        expect(table.length > 0);

        console.log('table - humidity sensor 1 add 2nd: ', table);
      });

      it('table from normalised test humidity sensor 1 add 2nd, 3rd', () => {
        let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_1Sensors, humiditySensor_3Sensors);
        let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_1Sensors, humiditySensor_3Sensors);

        let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
        let table: string = jsonDiffService.getJsonDiffsTable(normalDiffs);

        expect(table.length > 0);

        console.log('table - humidity sensor 1 add 2nd, 3rd: ', table);
      });

      it('table from normalised test humidity sensor - were 3 remove 2nd, 3rd', () => {
        let humiditySensor_3Sensors_Remove2nd3rd: any = clone(humiditySensor_3Sensors);
        // Simulate what the app does
        setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 2);
        setDateDeleted(humiditySensor_3Sensors_Remove2nd3rd.humiditySensors, 3);

        let diffs: any[] = jsonDiffService.getJsonDiff(humiditySensor_3Sensors, humiditySensor_3Sensors_Remove2nd3rd);
        let intDiffs: Array<DiffItem> = jsonDiffService.getJsonDiffsList(diffs, humiditySensor_3Sensors,
          humiditySensor_3Sensors_Remove2nd3rd);

        let normalDiffs: NormalisedDiffs = jsonDiffService.getNormalisedDiffsList(intDiffs);
        let table: string = jsonDiffService.getJsonDiffsTable(normalDiffs);

        expect(table.length > 0);

        console.log('table - humidity sensor - were 3 remove 2nd, 3rd: ', table);
      });
    });
  });
}
