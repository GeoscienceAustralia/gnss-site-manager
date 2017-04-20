import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';

/**.
 * This class represents a group of Surveyed Local Ties.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-ties-group',
    templateUrl: 'surveyed-local-ties-group.component.html',
})
export class SurveyedLocalTiesGroupComponent extends AbstractGroup<SurveyedLocalTieViewModel> implements OnInit {
    static compare(obj1: SurveyedLocalTieViewModel, obj2: SurveyedLocalTieViewModel): number {
        let date1: string = obj1.dateMeasured;
        let date2: string = obj2.dateMeasured;
        return AbstractGroup.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        siteLogModel && this.setItemsCollection(siteLogModel.surveyedLocalTies);
        console.log('SurveyedLocalTies: ', this.getItemsCollection());
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.surveyedLocalTies);
        console.log('SurveyedLocalTies (Original): ', this.getItemsOriginalCollection());
    }

    constructor() {
        super();
    }

    ngOnInit() {
        this.setupForm();
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    compare(obj1: SurveyedLocalTieViewModel, obj2: SurveyedLocalTieViewModel): number {
        return SurveyedLocalTiesGroupComponent.compare(obj1, obj2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(blank?: boolean): SurveyedLocalTieViewModel {
        return new SurveyedLocalTieViewModel();
    }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('surveyedLocalTies', this.groupArrayForm);
    }
}
