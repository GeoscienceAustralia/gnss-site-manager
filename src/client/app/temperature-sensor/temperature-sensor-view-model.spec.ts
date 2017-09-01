import { TemperatureSensorViewModel } from './temperature-sensor-view-model';

export function main() {
  let temperatureSensorsViewModel: TemperatureSensorViewModel;

  describe('Temperature Sensors View Model', () => {

    beforeEach(() => {
      temperatureSensorsViewModel = new TemperatureSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(temperatureSensorsViewModel).toBeDefined();

      expect(temperatureSensorsViewModel.accuracy).toBeNull();
      expect(temperatureSensorsViewModel.dataSamplingInterval).toBeNull();
      expect(temperatureSensorsViewModel.heightDiffToAntenna).toBeNull();
      expect(temperatureSensorsViewModel.manufacturer).toBeNull();
      expect(temperatureSensorsViewModel.notes).toBeNull();
      expect(temperatureSensorsViewModel.serialNumber).toBeNull();
      expect(temperatureSensorsViewModel.calibrationDate).toBeNull();
      expect(temperatureSensorsViewModel.startDate).toBeNull();
      expect(temperatureSensorsViewModel.endDate).toBeNull();
    });
  });
}
