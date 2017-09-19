import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';

export function main() {
    let surveyedLocalTieViewModel: SurveyedLocalTieViewModel;

    describe('Surveyed Local Tie View Model', () => {

        beforeEach(() => {
            surveyedLocalTieViewModel = new SurveyedLocalTieViewModel();
        });

        it('test default constructor with null field values', () => {
            expect(surveyedLocalTieViewModel).toBeDefined();

            expect(surveyedLocalTieViewModel.tiedMarkerName).toBeNull();
            expect(surveyedLocalTieViewModel.tiedMarkerUsage).toBeNull();
            expect(surveyedLocalTieViewModel.tiedMarkerCDPNumber).toBeNull();
            expect(surveyedLocalTieViewModel.tiedMarkerDOMESNumber).toBeNull();
            expect(surveyedLocalTieViewModel.differentialComponent).not.toBeNull();
            expect(surveyedLocalTieViewModel.differentialComponent.dx).toBeNull();
            expect(surveyedLocalTieViewModel.differentialComponent.dy).toBeNull();
            expect(surveyedLocalTieViewModel.differentialComponent.dz).toBeNull();
            expect(surveyedLocalTieViewModel.localSiteTiesAccuracy).toBeNull();
            expect(surveyedLocalTieViewModel.surveyMethod).toBeNull();
            expect(surveyedLocalTieViewModel.notes).toBeNull();
            expect(surveyedLocalTieViewModel.startDate).toBeNull();
            expect(surveyedLocalTieViewModel.endDate).toBeNull();
        });
    });
}
