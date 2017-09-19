import { OtherInstrumentationViewModel } from './other-instrumentation-view-model';

export function main() {
    let otherInstrumentationViewModel: OtherInstrumentationViewModel;

    describe('Other Instrumentation View Model', () => {

        beforeEach(() => {
            otherInstrumentationViewModel = new OtherInstrumentationViewModel();
        });

        it('test default constructor and all fields are created', () => {
            expect(otherInstrumentationViewModel).toBeDefined();

            expect(otherInstrumentationViewModel.instrumentation).toBeNull();
            expect(otherInstrumentationViewModel.startDate).toBeNull();
            expect(otherInstrumentationViewModel.endDate).toBeNull();
        });
    });
}
