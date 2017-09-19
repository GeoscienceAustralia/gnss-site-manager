import { ResponsiblePartyViewModel } from './responsible-party-view-model';

export function main() {
    let responsiblePartyViewModel: ResponsiblePartyViewModel;

    describe('Responsible Party View Model', () => {

        beforeEach(() => {
            responsiblePartyViewModel = new ResponsiblePartyViewModel();
        });

        it('test default constructor with null field values', () => {
            expect(responsiblePartyViewModel).toBeDefined();

            expect(responsiblePartyViewModel.individualName).toBeNull();
            expect(responsiblePartyViewModel.organisationName).toBeNull();
            expect(responsiblePartyViewModel.positionName).toBeNull();
            expect(responsiblePartyViewModel.deliveryPoint).toBeNull();
            expect(responsiblePartyViewModel.city).toBeNull();
            expect(responsiblePartyViewModel.administrativeArea).toBeNull();
            expect(responsiblePartyViewModel.postalCode).toBeNull();
            expect(responsiblePartyViewModel.country).toBeNull();
            expect(responsiblePartyViewModel.email).toBeNull();
            expect(responsiblePartyViewModel.primaryPhone).toBeNull();
            expect(responsiblePartyViewModel.secondaryPhone).toBeNull();
            expect(responsiblePartyViewModel.fax).toBeNull();
            expect(responsiblePartyViewModel.url).toBeNull();
        });
    });
}
