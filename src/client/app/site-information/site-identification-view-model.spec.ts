import { SiteIdentificationViewModel } from './site-identification-view-model';

export function main() {
    let siteIdentificationViewModel: SiteIdentificationViewModel;

    describe('Site Identification View Model', () => {

        beforeEach(() => {
            siteIdentificationViewModel = new SiteIdentificationViewModel();
        });

        it('test default constructor with initial null field values', () => {
            expect(siteIdentificationViewModel).toBeDefined();

            expect(siteIdentificationViewModel.siteName).toBeNull();
            expect(siteIdentificationViewModel.fourCharacterID).toBeNull();
            expect(siteIdentificationViewModel.monumentInscription).toBeNull();
            expect(siteIdentificationViewModel.iersDOMESNumber).toBeNull();
            expect(siteIdentificationViewModel.cdpNumber).toBeNull();
            expect(siteIdentificationViewModel.monumentDescription).toBeNull();
            expect(siteIdentificationViewModel.heightOfTheMonument).toBeNull();
            expect(siteIdentificationViewModel.monumentFoundation).toBeNull();
            expect(siteIdentificationViewModel.foundationDepth).toBeNull();
            expect(siteIdentificationViewModel.markerDescription).toBeNull();
            expect(siteIdentificationViewModel.dateInstalled).toBeNull();
            expect(siteIdentificationViewModel.geologicCharacteristic).toBeNull();
            expect(siteIdentificationViewModel.bedrockType).toBeNull();
            expect(siteIdentificationViewModel.bedrockCondition).toBeNull();
            expect(siteIdentificationViewModel.fractureSpacing).toBeNull();
            expect(siteIdentificationViewModel.faultZonesNearby).toBeNull();
            expect(siteIdentificationViewModel.distanceActivity).toBeNull();
            expect(siteIdentificationViewModel.notes).toBeNull();
        });
    });
}
