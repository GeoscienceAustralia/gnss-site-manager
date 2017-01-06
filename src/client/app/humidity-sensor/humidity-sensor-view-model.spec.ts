import {HumiditySensorViewModel} from './humidity-sensor-view-model';
export function main() {
  let humiditySensorsViewModel: HumiditySensorViewModel;

  describe('Humidity Sensors View Model', () => {

    beforeEach(() => {
      humiditySensorsViewModel = new HumiditySensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(humiditySensorsViewModel).toBeDefined();

      expect(humiditySensorsViewModel.accuracyPercentRelativeHumidity).toEqual(0);
      expect(humiditySensorsViewModel.aspiration).toEqual('');
      expect(humiditySensorsViewModel.dataSamplingInterval).toEqual(0);
      expect(humiditySensorsViewModel.heightDiffToAntenna).toEqual(0);
      expect(humiditySensorsViewModel.manufacturer).toEqual('');
      expect(humiditySensorsViewModel.notes).toEqual('');
      expect(humiditySensorsViewModel.serialNumber).toEqual('');
      expect(humiditySensorsViewModel.calibrationDate).toBeDefined();
      expect(humiditySensorsViewModel.calibrationDate).toEqual('');
      expect(humiditySensorsViewModel.startDate).toBeDefined();
      expect(humiditySensorsViewModel.startDate).toEqual('');
      expect(humiditySensorsViewModel.endDate).toEqual('');
    });
  });
}
