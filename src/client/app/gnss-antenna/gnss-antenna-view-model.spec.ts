import { GnssAntennaViewModel } from './gnss-antenna-view-model';

export function main() {
    let gnssAntennaViewModel: GnssAntennaViewModel;

    describe('GNSS Antenna View Model', () => {

        beforeEach(() => {
            gnssAntennaViewModel = new GnssAntennaViewModel();
        });

        it('test default constructor and all fields are created', () => {
            expect(gnssAntennaViewModel).toBeDefined();

            expect(gnssAntennaViewModel.antennaType).toBeNull();
            expect(gnssAntennaViewModel.serialNumber).toBeNull();
            expect(gnssAntennaViewModel.antennaReferencePoint).toBeNull();
            expect(gnssAntennaViewModel.markerArpEastEcc).toBeNull();
            expect(gnssAntennaViewModel.markerArpUpEcc).toBeNull();
            expect(gnssAntennaViewModel.markerArpNorthEcc).toBeNull();
            expect(gnssAntennaViewModel.alignmentFromTrueNorth).toBeNull();
            expect(gnssAntennaViewModel.antennaRadomeType).toBeNull();
            expect(gnssAntennaViewModel.radomeSerialNumber).toBeNull();
            expect(gnssAntennaViewModel.antennaCableType).toBeNull();
            expect(gnssAntennaViewModel.antennaCableLength).toBeNull();
            expect(gnssAntennaViewModel.notes).toBeNull();
            expect(gnssAntennaViewModel.startDate).toBeNull();
            expect(gnssAntennaViewModel.endDate).toBeNull();
        });
    });
}
