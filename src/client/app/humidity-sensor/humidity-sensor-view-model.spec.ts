import { HumiditySensorViewModel } from './humidity-sensor-view-model';

export function main() {
  let humiditySensorsViewModel: HumiditySensorViewModel;

  describe('Humidity Sensors View Model', () => {

    beforeEach(() => {
      humiditySensorsViewModel = new HumiditySensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(humiditySensorsViewModel).toBeDefined();

      expect(humiditySensorsViewModel.accuracy).toBeNull();
      expect(humiditySensorsViewModel.aspiration).toBeNull();
      expect(humiditySensorsViewModel.dataSamplingInterval).toBeNull();
      expect(humiditySensorsViewModel.heightDiffToAntenna).toBeNull();
      expect(humiditySensorsViewModel.manufacturer).toBeNull();
      expect(humiditySensorsViewModel.notes).toBeNull();
      expect(humiditySensorsViewModel.serialNumber).toBeNull();
      expect(humiditySensorsViewModel.calibrationDate).toBeNull();
      expect(humiditySensorsViewModel.startDate).toBeNull();
      expect(humiditySensorsViewModel.endDate).toBeNull();
    });
  });
}
