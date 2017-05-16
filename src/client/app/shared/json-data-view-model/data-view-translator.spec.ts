import { SiteLogDataModel } from './data-model/site-log-data-model';
import { DataViewTranslatorService, doWriteViewToData, FieldMap } from './data-view-translator';
import { JsonViewModelServiceSpecData } from './json-view-model.service.spec.data';
import { HumiditySensorViewModel } from '../../humidity-sensor/humidity-sensor-view-model';
import { GnssReceiverViewModel } from '../../gnss-receiver/gnss-receiver-view-model';
import { MiscUtils } from '../global/misc-utils';

export function main() {
  let completeValidSitelog: any = JsonViewModelServiceSpecData.data();
  let fieldMappings: FieldMap[] = new HumiditySensorViewModel().getFieldMaps();

  describe('Json view translator service', () => {

    it('should be defined', () => {
      expect(completeValidSitelog).toBeDefined();
      expect(fieldMappings).toBeDefined();
      expect(fieldMappings.length).toBeGreaterThan(0);
    });

    it('should translate d2v for humiditySensors', () => {
      let humiditySensorsData: any[] = new SiteLogDataModel(completeValidSitelog).humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0];

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      DataViewTranslatorService.translateD2V(firstHSD, firstHSV, firstHSV.getFieldMaps());

      expect(firstHSV).toBeDefined();

      expect(firstHSV.accuracyPercentRelativeHumidity).not.toBeNull();
      expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.humiditySensor.accuracyPercentRelativeHumidity);
      expect(firstHSV.aspiration).toEqual(firstHSD.humiditySensor.aspiration);
      expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.humiditySensor.dataSamplingInterval);
      expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.humiditySensor.heightDiffToAntenna);
      expect(firstHSV.manufacturer).toEqual(firstHSD.humiditySensor.manufacturer);
      expect(firstHSV.notes).toEqual(firstHSD.humiditySensor.notes);
      expect(firstHSV.serialNumber).toEqual(firstHSD.humiditySensor.serialNumber);

      expect(firstHSV.calibrationDate).toEqual(firstHSD.humiditySensor.calibrationDate.value[0]);
      expect(firstHSV.startDate).toEqual(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
      expect(firstHSV.endDate).toBeNull();
    });

    it('should translate v2d for humiditySensors', () => {
      let humiditySensorsData: any = new SiteLogDataModel(completeValidSitelog).humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0];

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      DataViewTranslatorService.translateD2V(firstHSD, firstHSV, firstHSV.getFieldMaps());

      let newHSD: any = {};
      DataViewTranslatorService.translateV2D(firstHSV, newHSD, firstHSV.getFieldMaps());

      expect(newHSD).toBeDefined();

      expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).not.toBeNull();
      expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity);
      expect(newHSD.humiditySensor.aspiration).toEqual(firstHSV.aspiration);
      expect(newHSD.humiditySensor.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval);
      expect(newHSD.humiditySensor.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna);
      expect(newHSD.humiditySensor.manufacturer).toEqual(firstHSV.manufacturer);
      expect(newHSD.humiditySensor.notes).toEqual(firstHSV.notes);
      expect(newHSD.humiditySensor.serialNumber).toEqual(firstHSV.serialNumber);

      expect(newHSD.humiditySensor.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
      expect(firstHSV.startDate).toEqual(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSV.endDate).toBeNull();
      expect(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeNull();
    });

      it('should translate d2v for humiditySensors using translate method', () => {
          let humiditySensorsData: any[] = new SiteLogDataModel(completeValidSitelog).humiditySensors;
          expect(humiditySensorsData).toBeDefined();
          let firstHSD: any = humiditySensorsData[0];

          let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

          DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getFieldMaps()); // comment

          expect(firstHSV).toBeDefined();

          expect(firstHSV.accuracyPercentRelativeHumidity).not.toBeNull();
          expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.humiditySensor.accuracyPercentRelativeHumidity);
          expect(firstHSV.aspiration).toEqual(firstHSD.humiditySensor.aspiration);
          expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.humiditySensor.dataSamplingInterval);
          expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.humiditySensor.heightDiffToAntenna);
          expect(firstHSV.manufacturer).toEqual(firstHSD.humiditySensor.manufacturer);
          expect(firstHSV.notes).toEqual(firstHSD.humiditySensor.notes);
          expect(firstHSV.serialNumber).toEqual(firstHSD.humiditySensor.serialNumber);

          expect(firstHSV.calibrationDate).toEqual(firstHSD.humiditySensor.calibrationDate.value[0]);
          expect(firstHSV.startDate).toEqual(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod']
              .beginPosition.value[0]);
          expect(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
          expect(firstHSV.endDate).toBeNull();
      });

      it('should translate v2d for humiditySensors using translate method', () => {
          let humiditySensorsData: any = new SiteLogDataModel(completeValidSitelog).humiditySensors;
          expect(humiditySensorsData).toBeDefined();
          let firstHSD: any = humiditySensorsData[0];

          let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

          DataViewTranslatorService.translateD2V(firstHSD, firstHSV, firstHSV.getFieldMaps());

          let newHSD: any = {};
          DataViewTranslatorService.translate(firstHSV, newHSD, firstHSV.getFieldMaps(), doWriteViewToData);

          expect(newHSD).toBeDefined();

          expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).not.toBeNull();
          expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity);
          expect(newHSD.humiditySensor.aspiration).toEqual(firstHSV.aspiration);
          expect(newHSD.humiditySensor.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval);
          expect(newHSD.humiditySensor.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna);
          expect(newHSD.humiditySensor.manufacturer).toEqual(firstHSV.manufacturer);
          expect(newHSD.humiditySensor.notes).toEqual(firstHSV.notes);
          expect(newHSD.humiditySensor.serialNumber).toEqual(firstHSV.serialNumber);

          expect(newHSD.humiditySensor.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
          expect(firstHSV.startDate).toEqual(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod']
              .beginPosition.value[0]);
          expect(firstHSV.endDate).toBeNull();
          expect(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeNull();
      });

    // now test the new 'date' format type - that is only applied v2d

      fit('should translate v2d for gnssReceivers using translate method and Date() dates', () => {
          let receiverData: any = new SiteLogDataModel(completeValidSitelog).gnssReceivers;
          expect(receiverData).toBeDefined();
          let firstRD: any = receiverData[1];

          let firstRV: GnssReceiverViewModel = new GnssReceiverViewModel();

          DataViewTranslatorService.translateD2V(firstRD, firstRV, firstRV.getFieldMaps());

          // Now change the dateInstalled, removed to dates
          firstRV.startDate = new Date(firstRV.startDate);

          let newRD: any = {};
          // DataViewTranslatorService.translateV2D(firstHSV, newHSD, firstHSV.getFieldMaps());
          DataViewTranslatorService.translate(firstRV, newRD, firstRV.getFieldMaps(), doWriteViewToData);

          expect(newRD).toBeDefined();

          expect(newRD.gnssReceiver.igsModelCode.value).not.toBeNull();
          expect(newRD.gnssReceiver.igsModelCode.value).toEqual(firstRV.receiverType);
          expect(newRD.gnssReceiver.manufacturerSerialNumber).toEqual(firstRV.manufacturerSerialNumber);
          expect(newRD.gnssReceiver.firmwareVersion).toEqual(firstRV.firmwareVersion);
          expect(newRD.gnssReceiver.satelliteSystem[0].value).toEqual(firstRV.satelliteSystem);
          expect(newRD.gnssReceiver.elevationCutoffSetting).toEqual(firstRV.elevationCutoffSetting);
          expect(newRD.gnssReceiver.notes).toEqual(firstRV.notes);
          expect(newRD.gnssReceiver.temperatureStabilization).toEqual(firstRV.temperatureStabilization);

          // dateInstalled was changed to a Date
          expect(newRD.gnssReceiver.dateInstalled.value[0]).toEqual(MiscUtils.formatDateToDatetimeString(firstRV.startDate));
          // But dateRemoved wasn't
          expect(newRD.gnssReceiver.dateRemoved.value[0]).toEqual(MiscUtils.formatDateToDatetimeString(firstRV.endDate));
          // expect(firstRV.startDate).toEqual(newRD.gnssReceiver.validTime.abstractTimePrimitive['gml:TimePeriod']
          //     .beginPosition.value[0]);
          // expect(firstRV.endDate).toBeNull();
          // expect(newRD.gnssReceiver.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeNull();
      });
  });
}
