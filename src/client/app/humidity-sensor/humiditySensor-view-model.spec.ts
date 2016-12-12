import {JsonViewModelServiceSpecData} from '../shared/json-data-view-model/json-view-model.service.spec.data';
import {HumiditySensorsViewModel, HumiditySensorViewModel} from './humiditySensor-view-model';
export function main() {
  let humiditySensorsDataView: any;
  let humiditySensorsViewModel: HumiditySensorsViewModel;

  fdescribe('HumiditySensorsViewModel', () => {

    beforeEach(() => {
      humiditySensorsDataView = JsonViewModelServiceSpecData.data()['geo:siteLog'].humiditySensors;
      humiditySensorsViewModel = new HumiditySensorsViewModel();
    });

    it('test data to view', () => {
      humiditySensorsViewModel.createFromDataModel(humiditySensorsDataView);

      expect(humiditySensorsViewModel).toBeDefined();
      let out: any = JSON.stringify(humiditySensorsViewModel);
      console.log('view: ', out);

      let firstHSD: any = humiditySensorsDataView[0].humiditySensor;
      let firstHSV: HumiditySensorViewModel = humiditySensorsViewModel.humiditySensors[0].humiditySensor;

      expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.accuracyPercentRelativeHumidity);
      expect(firstHSV.aspiration).toEqual(firstHSD.aspiration);
      expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.dataSamplingInterval);
      expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.heightDiffToAntenna);
      expect(firstHSV.manufacturer).toEqual(firstHSD.manufacturer);
      expect(firstHSV.notes).toEqual(firstHSD.notes);
      expect(firstHSV.serialNumber).toEqual(firstHSD.serialNumber);

      expect(firstHSV.calibrationDate).toEqual(firstHSD.calibrationDate.value[0]);
      expect(firstHSV.startDate).toEqual(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSV.endDate).toEqual('');
      expect(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
    });

    it('test view to data', () => {
      humiditySensorsViewModel.createFromDataModel(humiditySensorsDataView);

      expect(humiditySensorsViewModel).toBeDefined();

      let humiditySensorsDataView2: any;

      humiditySensorsDataView2 = humiditySensorsViewModel.setDataModel(humiditySensorsDataView2);

      expect(humiditySensorsDataView2).toBeDefined();

      let out: any = JSON.stringify(humiditySensorsDataView2);
      console.log('view back to data: ', out);

      let firstHSV: HumiditySensorViewModel = humiditySensorsViewModel.humiditySensors[0].humiditySensor;
      let firstHSD: any = humiditySensorsDataView2[0].humiditySensor;

      expect(firstHSD.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity.toString());
      expect(firstHSD.aspiration).toEqual(firstHSV.aspiration);
      expect(firstHSD.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval.toString());
      expect(firstHSD.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna.toString());
      expect(firstHSD.manufacturer).toEqual(firstHSV.manufacturer);
      expect(firstHSD.notes).toEqual(firstHSV.notes);
      expect(firstHSD.serialNumber).toEqual(firstHSV.serialNumber);

      expect(firstHSD.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
      expect(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]).toEqual(firstHSV.startDate);
      expect(firstHSV.endDate).toEqual('');
      expect(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toEqual('');
    });

    it('test view to data using original data model', () => {
      let newHeightDiffToAntennaValue: number = 66;
      humiditySensorsViewModel.createFromDataModel(humiditySensorsDataView);

      expect(humiditySensorsViewModel).toBeDefined();

      // let humiditySensorsDataView2: any;

      // Change value in View
      humiditySensorsViewModel.humiditySensors[0].humiditySensor.heightDiffToAntenna = newHeightDiffToAntennaValue;

      humiditySensorsViewModel.setDataModel(humiditySensorsDataView); // object exists so will be populated

      expect(humiditySensorsDataView).toBeDefined();

      let out: any = JSON.stringify(humiditySensorsDataView);
      console.log('view back to data: ', out);

      let firstHSV: HumiditySensorViewModel = humiditySensorsViewModel.humiditySensors[0].humiditySensor;
      let firstHSD: any = humiditySensorsDataView[0].humiditySensor;

      expect(firstHSD.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity.toString());
      expect(firstHSD.aspiration).toEqual(firstHSV.aspiration);
      expect(firstHSD.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval.toString());
      expect(firstHSV.heightDiffToAntenna).toEqual(newHeightDiffToAntennaValue);
      expect(firstHSD.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna.toString());
      expect(firstHSD.manufacturer).toEqual(firstHSV.manufacturer);
      expect(firstHSD.notes).toEqual(firstHSV.notes);
      expect(firstHSD.serialNumber).toEqual(firstHSV.serialNumber);

      expect(firstHSD.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
      expect(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]).toEqual(firstHSV.startDate);
      expect(firstHSV.endDate).toEqual('');
      expect(firstHSD.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toEqual('');
    });
  });
}
