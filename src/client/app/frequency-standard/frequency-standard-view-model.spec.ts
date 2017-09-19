import { FrequencyStandardViewModel } from './frequency-standard-view-model';

export function main() {
    let frequencyStandardViewModel: FrequencyStandardViewModel;

    describe('Frequency Standard View Model', () => {

        beforeEach(() => {
            frequencyStandardViewModel = new FrequencyStandardViewModel();
        });

        it('test default constructor and all fields are created', () => {
            expect(frequencyStandardViewModel).toBeDefined();

            expect(frequencyStandardViewModel.standardType).toBeNull();
            expect(frequencyStandardViewModel.inputFrequency).toBeNull();
            expect(frequencyStandardViewModel.notes).toBeNull();
            expect(frequencyStandardViewModel.startDate).toBeNull();
            expect(frequencyStandardViewModel.endDate).toBeNull();
        });
    });
}
