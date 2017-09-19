import { SiteLocationViewModel } from './site-location-view-model';

export function main() {
    let siteLocationViewModel: SiteLocationViewModel;

    describe('Site Location View Model', () => {

        beforeEach(() => {
            siteLocationViewModel = new SiteLocationViewModel();
        });

        it('test default constructor and all fields are created', () => {
            expect(siteLocationViewModel).toBeDefined();

            expect(siteLocationViewModel.city).toBeNull();
            expect(siteLocationViewModel.state).toBeNull();
            expect(siteLocationViewModel.countryCodeISO).toBeNull();
            expect(siteLocationViewModel.cartesianPosition).not.toBeNull();
            expect(siteLocationViewModel.cartesianPosition.x).toBeNull();
            expect(siteLocationViewModel.cartesianPosition.y).toBeNull();
            expect(siteLocationViewModel.cartesianPosition.z).toBeNull();
            expect(siteLocationViewModel.geodeticPosition).not.toBeNull();
            expect(siteLocationViewModel.geodeticPosition.lat).toBeNull();
            expect(siteLocationViewModel.geodeticPosition.lon).toBeNull();
            expect(siteLocationViewModel.geodeticPosition.height).toBeNull();
            expect(siteLocationViewModel.tectonicPlate).toBeNull();
            expect(siteLocationViewModel.notes).toBeNull();
        });
    });
}
