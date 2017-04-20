import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * This class represents the SiteInfoComponent & SiteIdentification for viewing and editing the details of site/receiver/antenna.
 */
@Component({
    moduleId: module.id,
    selector: 'site-identification',
    templateUrl: 'site-identification.component.html'
})
export class SiteIdentificationComponent implements OnInit {
    @Input('siteInfoForm') siteInfoForm: FormGroup;

    status: any = {
        isSiteIdentificationGroupOpen: false
    };

    @Input()
    set siteLogModel(siteLogModel: any) {
        // Avoid errors that occurs when this form is built before the data is loaded
        if (siteLogModel && Object.keys(siteLogModel).length > 0) {
            this._siteLogModel = siteLogModel;
            this.siteIdentification = siteLogModel.siteIdentification;
            this._changeDetectionRef.detectChanges();
            this.patchForm();
        }
    }

    private miscUtils: any = MiscUtils;

    private siteIdentificationForm: FormGroup;

    private _siteLogModel: any;
    private _originalSiteLogModel: any;

    private siteIdentification: any;
    private siteIdentificationOrig: any;

    get siteLogModel(): any {
        return this._siteLogModel;
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        this._originalSiteLogModel = originalSiteLogModel;
        this.siteIdentificationOrig = originalSiteLogModel &&
            Object.keys(originalSiteLogModel).length > 0 ? originalSiteLogModel.siteIdentification : {};
    }

    get originalSiteLogModel(): any {
        return this._originalSiteLogModel;
    }

    constructor(private formBuilder: FormBuilder, private _changeDetectionRef : ChangeDetectorRef) {}

    ngOnInit() {
        this.setupForm();
        // patchForm is called from the setter in this form
    }

    private setupForm() {
        this.siteIdentificationForm = this.formBuilder.group({
            siteName: [''],//, [Validators.minLength(4), Validators.maxLength(100)]],
            fourCharacterID: [''],//, [Validators.required, Validators.minLength(4), Validators.maxLength(9)]],
            monumentNumber: '',
            receiverNumber: '',
            monumentInscription: [''],//, [Validators.maxLength(100)]],
            iersDOMESNumber: [''],//, [Validators.maxLength(100)]],
            cdpNumber: [''],//, [Validators.maxLength(100)]],
            monumentDescription: [''],//, [Validators.maxLength(100)]],
            heightOfTheMonument: '',
            monumentFoundation: [''],//, [Validators.maxLength(100)]],
            foundationDepth: '',
            markerDescription: [''],//, [Validators.maxLength(100)]],
            dateInstalled: [''],//, [Validators.maxLength(100)]],
            geologicCharacteristic: [''],//, [Validators.maxLength(100)]],
            bedrockType: [''],//, [Validators.maxLength(100)]],
            bedrockCondition: [''],//, [Validators.maxLength(100)]],
            fractureSpacing: [''],//, [Validators.maxLength(100)]],
            faultZonesNearby: [''],//, [Validators.maxLength(100)]],
            distanceActivity: [''],//, [Validators.maxLength(100)]],
            notes: [''],//, [Validators.maxLength(2000)]],
    });
        this.siteInfoForm.addControl('siteIdentification', this.siteIdentificationForm);
    }

    private patchForm() {
        this.siteIdentificationForm.setValue(this.siteIdentification);
    }
}

