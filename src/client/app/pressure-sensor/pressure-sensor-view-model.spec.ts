import { PressureSensorViewModel } from './pressure-sensor-view-model';

export function main() {
  let pressureSensorsViewModel: PressureSensorViewModel;

  describe('Pressure Sensors View Model', () => {

    beforeEach(() => {
      pressureSensorsViewModel = new PressureSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(pressureSensorsViewModel).toBeDefined();
      expect(pressureSensorsViewModel.accuracy).toBeNull();
      expect(pressureSensorsViewModel.dataSamplingInterval).toBeNull();
      expect(pressureSensorsViewModel.heightDiffToAntenna).toBeNull();
      expect(pressureSensorsViewModel.manufacturer).toBeNull();
      expect(pressureSensorsViewModel.notes).toBeNull();
      expect(pressureSensorsViewModel.serialNumber).toBeNull();
      expect(pressureSensorsViewModel.calibrationDate).toBeNull();
      expect(pressureSensorsViewModel.startDate).toBeNull();
      expect(pressureSensorsViewModel.endDate).toBeNull();
    });
  });
}
