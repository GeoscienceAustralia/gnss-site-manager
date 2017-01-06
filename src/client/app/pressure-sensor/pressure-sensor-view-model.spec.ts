import {PressureSensorViewModel} from './pressure-sensor-view-model';
export function main() {
  let pressureSensorsViewModel: PressureSensorViewModel;

  describe('Pressure Sensors View Model', () => {

    beforeEach(() => {
      pressureSensorsViewModel = new PressureSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(pressureSensorsViewModel).toBeDefined();

      expect(pressureSensorsViewModel.accuracyHpa).toEqual(0);
      expect(pressureSensorsViewModel.dataSamplingInterval).toEqual(0);
      expect(pressureSensorsViewModel.heightDiffToAntenna).toEqual(0);
      expect(pressureSensorsViewModel.manufacturer).toEqual('');
      expect(pressureSensorsViewModel.notes).toEqual('');
      expect(pressureSensorsViewModel.serialNumber).toEqual('');
      expect(pressureSensorsViewModel.calibrationDate).toBeDefined();
      expect(pressureSensorsViewModel.calibrationDate).toEqual('');
      expect(pressureSensorsViewModel.startDate).toBeDefined();
      expect(pressureSensorsViewModel.startDate).toEqual('');
      expect(pressureSensorsViewModel.endDate).toEqual('');
    });
  });
}
