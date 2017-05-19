import { PressureSensorViewModel } from './pressure-sensor-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
export function main() {
  let pressureSensorsViewModel: PressureSensorViewModel;

  describe('Pressure Sensors View Model', () => {

    beforeEach(() => {
      pressureSensorsViewModel = new PressureSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(pressureSensorsViewModel).toBeDefined();

      expect(pressureSensorsViewModel.accuracyHPa).toEqual(0);
      expect(pressureSensorsViewModel.dataSamplingInterval).toEqual(0);
      expect(pressureSensorsViewModel.heightDiffToAntenna).toEqual(0);
      expect(pressureSensorsViewModel.manufacturer).toEqual('');
      expect(pressureSensorsViewModel.notes).toEqual('');
      expect(pressureSensorsViewModel.serialNumber).toEqual('');
      // The defaults for calibration and start date is now() - drop time when test for this
      let nowPart: string = MiscUtils.getUTCDateTime().replace(/T.*/,'');
      expect(pressureSensorsViewModel.calibrationDate).toBeDefined();
      expect(pressureSensorsViewModel.calibrationDate).not.toEqual('');
      expect(pressureSensorsViewModel.calibrationDate).toContain(nowPart);
      expect(pressureSensorsViewModel.startDate).toBeDefined();
      expect(pressureSensorsViewModel.startDate).toContain(nowPart);
      expect(pressureSensorsViewModel.endDate).toEqual('');
    });
  });
}
