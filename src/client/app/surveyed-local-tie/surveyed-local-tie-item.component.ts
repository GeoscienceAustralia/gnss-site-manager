import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { DialogService } from '../shared/index';

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
        this.setupForm();
        this.patchForm();
    }

    protected patchForm() {
        this.itemGroup.setValue(this.surveyedLocalTie);
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            tiedMarkerName: [''],//, [Validators.required, Validators.maxLength(100)]],
            tiedMarkerUsage: [''],//, [Validators.maxLength(100)]],
            tiedMarkerCDPNumber: [''],//, [Validators.maxLength(100)]],
            tiedMarkerDOMESNumber: [''],//, [Validators.maxLength(100)]],
            dx: [''],//, [Validators.maxLength(100)]],
            dy: [''],//, [Validators.maxLength(100)]],
            dz: [''],//, [Validators.maxLength(100)]],
            surveyMethod: [''],//, [Validators.maxLength(100)]],
            localSiteTiesAccuracy: [''],//, [Validators.maxLength(100)]],
            dateMeasured: [''],//, [Validators.maxLength(100)]],
            notes: [''],//, [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        this.addToGroupArray(this.itemGroup);
    }
}
