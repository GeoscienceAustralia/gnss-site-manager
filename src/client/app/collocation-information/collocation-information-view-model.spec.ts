import { CollocationInformationViewModel } from './collocation-information-view-model';

export function main() {
    let collocationInformationViewModel: CollocationInformationViewModel;

    describe('Collocation Information View Model', () => {

        beforeEach(() => {
            collocationInformationViewModel = new CollocationInformationViewModel();
        });

        it('test default constructor and all fields are created', () => {
            expect(collocationInformationViewModel).toBeDefined();

            expect(collocationInformationViewModel.instrumentationType).toBeNull();
            expect(collocationInformationViewModel.status).toBeNull();
            expect(collocationInformationViewModel.notes).toBeNull();
            expect(collocationInformationViewModel.startDate).toBeNull();
            expect(collocationInformationViewModel.endDate).toBeNull();
        });
    });
}
