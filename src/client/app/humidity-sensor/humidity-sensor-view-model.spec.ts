import { HumiditySensorViewModel } from './humidity-sensor-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
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
      // The defaults for calibration and start date is now() - drop time when test for this
      let nowPart: string = MiscUtils.getUTCDateTime().replace(/T.*/,'');
      expect(humiditySensorsViewModel.calibrationDate).toBeDefined();
      expect(humiditySensorsViewModel.calibrationDate).not.toEqual('');
      expect(humiditySensorsViewModel.calibrationDate).toContain(nowPart);
      expect(humiditySensorsViewModel.startDate).toBeDefined();
      expect(humiditySensorsViewModel.startDate).toContain(nowPart);
      expect(humiditySensorsViewModel.endDate).toEqual('');
    });
  });
}
