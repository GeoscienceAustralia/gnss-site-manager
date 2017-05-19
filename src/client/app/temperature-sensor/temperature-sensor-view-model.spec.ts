import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
export function main() {
  let temperatureSensorsViewModel: TemperatureSensorViewModel;

  describe('Temperature Sensors View Model', () => {

    beforeEach(() => {
      temperatureSensorsViewModel = new TemperatureSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(temperatureSensorsViewModel).toBeDefined();

      expect(temperatureSensorsViewModel.accuracyDegreesCelcius).toEqual(0);
      expect(temperatureSensorsViewModel.dataSamplingInterval).toEqual(0);
      expect(temperatureSensorsViewModel.heightDiffToAntenna).toEqual(0);
      expect(temperatureSensorsViewModel.manufacturer).toEqual('');
      expect(temperatureSensorsViewModel.notes).toEqual('');
      expect(temperatureSensorsViewModel.serialNumber).toEqual('');
      // The defaults for calibration and start date is now() - drop time when test for this
      let nowPart: string = MiscUtils.getUTCDateTime().replace(/T.*/,'');
      expect(temperatureSensorsViewModel.calibrationDate).toBeDefined();
      expect(temperatureSensorsViewModel.calibrationDate).not.toEqual('');
      expect(temperatureSensorsViewModel.calibrationDate).toContain(nowPart);
      expect(temperatureSensorsViewModel.startDate).toBeDefined();
      expect(temperatureSensorsViewModel.startDate).toContain(nowPart);
      expect(temperatureSensorsViewModel.endDate).toEqual('');
    });
  });
}
