import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItem, ItemControls } from '../shared/abstract-groups-items/abstract-item';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single Surveyed Local Tie.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-tie-item',
    templateUrl: 'surveyed-local-tie-item.component.html',
})
export class SurveyedLocalTieItemComponent extends AbstractItem implements OnInit {
    /**
     * The SurveyedLocalTie in question.
     */
    @Input() surveyedLocalTie: SurveyedLocalTieViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.patchForm();
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    getItem(): AbstractViewModel {
        return this.surveyedLocalTie;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        // let itemGroup: FormGroup = formBuilder.group({
        // turn off all Validators until work out solution to 'was false now true' problem
        // TODO Fix Validators
        return new ItemControls([
            {tiedMarkerName: new FormControl([''])},//, [Validators.required, Validators.maxLength(100)]],
            {tiedMarkerUsage: new FormControl([''])},//, [Validators.maxLength(100)]],
            {tiedMarkerCDPNumber: new FormControl([''])},//, [Validators.maxLength(100)]],
            {tiedMarkerDOMESNumber: new FormControl([''])},//, [Validators.maxLength(100)]],
            {dx: new FormControl([''])},//, [Validators.maxLength(100)]],
            {dy: new FormControl([''])},//, [Validators.maxLength(100)]],
            {dz: new FormControl([''])},//, [Validators.maxLength(100)]],
            {surveyMethod: new FormControl([''])},//, [Validators.maxLength(100)]],
            {localSiteTiesAccuracy: new FormControl([''])},//, [Validators.maxLength(100)]],
            {dateMeasured: new FormControl([''])},//, [Validators.maxLength(100)]],
            {notes: new FormControl(['', [Validators.maxLength(2000)]])},
            {fieldMaps: new FormControl('')},
            {dateDeleted: new FormControl([''])},
            {dateInserted: new FormControl([''])},
            {deletedReason: new FormControl([''])}
        ]);
    }

}
