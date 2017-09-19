import { GnssReceiverViewModel } from './gnss-receiver-view-model';

export function main() {
    let gnssReceiverViewModel: GnssReceiverViewModel;

    describe('GNSS Receiver View Model', () => {

    beforeEach(() => {
        gnssReceiverViewModel = new GnssReceiverViewModel();
    });

    it('test default constructor and all fields are created', () => {
        expect(gnssReceiverViewModel).toBeDefined();

        expect(gnssReceiverViewModel.receiverType).toBeNull();
        expect(gnssReceiverViewModel.manufacturerSerialNumber).toBeNull();
        expect(gnssReceiverViewModel.firmwareVersion).toBeNull();
        expect(gnssReceiverViewModel.satelliteSystems.length).toBe(0);
        expect(gnssReceiverViewModel.elevationCutoffSetting).toBeNull();
        expect(gnssReceiverViewModel.temperatureStabilization).toBeNull();
        expect(gnssReceiverViewModel.notes).toBeNull();
        expect(gnssReceiverViewModel.startDate).toBeNull();
        expect(gnssReceiverViewModel.endDate).toBeNull();
        });
    });
}
