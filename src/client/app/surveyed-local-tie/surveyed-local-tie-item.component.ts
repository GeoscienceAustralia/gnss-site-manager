import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/http-request/site-log.service';
import { DatetimeValidator } from '../shared/form-input-validators/datetime-validator';

/**
 * This component represents a single Surveyed Local Tie.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-tie-item',
    templateUrl: 'surveyed-local-tie-item.component.html',
})
export class SurveyedLocalTieItemComponent extends AbstractItemComponent implements OnInit {
    /**
     * The SurveyedLocalTie in question.
     */
    @Input() surveyedLocalTie: SurveyedLocalTieViewModel;
    differentialComponentForm: FormGroup;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.itemGroup.controls.startDate.valueChanges.subscribe((date) => {
            let fields: any = {
                dx: this.differentialComponentForm.controls.dx.value,
                dy: this.differentialComponentForm.controls.dy.value,
                dz: this.differentialComponentForm.controls.dz.value
            };
            this.handleGroupFieldsChange(fields, this.differentialComponentForm);
        });
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    getItem(): AbstractViewModel {
        return this.surveyedLocalTie;
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        // Differential Components from GNSS Marker to the tied monument (ITRS)
        this.differentialComponentForm = this.formBuilder.group({
            dx: null,
            dy: null,
            dz: null
        });
        this.differentialComponentForm.valueChanges.subscribe((change: any) => {
            this.handleGroupFieldsChange(change, this.differentialComponentForm);
        });

        return this.formBuilder.group({
            id: [null],
            tiedMarkerName: ['', [Validators.maxLength(50)]],
            tiedMarkerUsage: ['', [Validators.maxLength(50)]],
            tiedMarkerCDPNumber: ['', [Validators.maxLength(25)]],
            tiedMarkerDOMESNumber: ['', [Validators.maxLength(25)]],
            differentialComponent: this.differentialComponentForm,
            surveyMethod: ['', [Validators.maxLength(50)]],
            localSiteTiesAccuracy: ['', [Validators.maxLength(50)]],
            startDate: [''],
            // TODO see GEOD-454 endDate not needed by this component but the value exists in the model
            endDate: [''],
            notes: [['', [Validators.maxLength(2000)]]],
            objectMap: [''],
        });
    }

    /**
     * Handle value changes in a group of input fields, including an external field - startDate. If none of them has value,
     * then all fields are optional; if any one of them has value, then the rest of the group fields are required
     * and must be provided with values.
     *
     * @param fields - a group of input fields in the groupForm
     * @param form - the FormGroup that holds the group of input fields
     */
    private handleGroupFieldsChange(fields: any, form: FormGroup) {
        let hasValue: boolean = false;
        Object.keys(fields).forEach((key: string) => {
            if (fields[key]) {
                hasValue = true;
            }
        });

        // Include startDate (Date Measured) as an extra field in the DifferentialComponent group
        let startDateFormControl: FormControl = <FormControl>this.itemGroup.controls.startDate;
        if (startDateFormControl.value) {
            hasValue = true;
        }
        let validators: any = [ new DatetimeValidator() ];
        if (hasValue) {
            validators.push(Validators.required);
        }
        startDateFormControl.setValidators(validators);
        startDateFormControl.updateValueAndValidity({emitEvent: false});

        Object.keys(fields).forEach((key: string) => {
            let formControl: FormControl = <FormControl>form.controls[key];
            if (hasValue) {
                formControl.setValidators([Validators.required]);
            } else {
                formControl.clearValidators();
            }
            formControl.updateValueAndValidity({emitEvent: false});
       });
    }
}
