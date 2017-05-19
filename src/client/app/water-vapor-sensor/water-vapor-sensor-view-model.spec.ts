import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
export function main() {
  let waterVaporSensorsViewModel: WaterVaporSensorViewModel;

  describe('WaterVapor Sensors View Model', () => {

    beforeEach(() => {
      waterVaporSensorsViewModel = new WaterVaporSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(waterVaporSensorsViewModel).toBeDefined();
      expect(waterVaporSensorsViewModel.heightDiffToAntenna).toEqual(0);
      expect(waterVaporSensorsViewModel.manufacturer).toEqual('');
      expect(waterVaporSensorsViewModel.notes).toEqual('');
      expect(waterVaporSensorsViewModel.serialNumber).toEqual('');
      // The defaults for calibration and start date is now() - drop time when test for this
      let nowPart: string = MiscUtils.getUTCDateTime().replace(/T.*/,'');
      expect(waterVaporSensorsViewModel.calibrationDate).toBeDefined();
      expect(waterVaporSensorsViewModel.calibrationDate).not.toEqual('');
      expect(waterVaporSensorsViewModel.calibrationDate).toContain(nowPart);
      expect(waterVaporSensorsViewModel.startDate).toBeDefined();
      expect(waterVaporSensorsViewModel.startDate).toContain(nowPart);
      expect(waterVaporSensorsViewModel.endDate).toEqual('');
    });
  });
}
