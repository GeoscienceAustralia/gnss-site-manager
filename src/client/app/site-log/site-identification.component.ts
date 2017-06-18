import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogViewModel }  from '../shared/json-data-view-model/view-model/site-log-view-model';
import { SiteIdentificationViewModel } from './site-identification-view-model';

/**
 * This class represents the SiteIdentification sub-component under the SiteInformation Component.
 *
 * Main fields of Site Identification (from https://igscb.jpl.nasa.gov/igscb/station/general/blank.log):
 * -----------------------------------------------------------------------------------------------------
 *      Site Name                :
 *      Four Character ID        : (A4)
 *      Monument Inscription     :
 *      IERS DOMES Number        : (A9)
 *      CDP Number               : (A4)
 *      Monument Description     : (PILLAR/BRASS PLATE/STEEL MAST/etc)
 *        Height of the Monument : (m)
 *        Monument Foundation    : (STEEL RODS, CONCRETE BLOCK, ROOF, etc)
 *        Foundation Depth       : (m)
 *      Marker Description       : (CHISELLED CROSS/DIVOT/BRASS NAIL/etc)
 *      Date Installed           : (CCYY-MM-DDThh:mmZ)
 *      Geologic Characteristic  : (BEDROCK/CLAY/CONGLOMERATE/GRAVEL/SAND/etc)
 *        Bedrock Type           : (IGNEOUS/METAMORPHIC/SEDIMENTARY)
 *        Bedrock Condition      : (FRESH/JOINTED/WEATHERED)
 *        Fracture Spacing       : (1-10 cm/11-50 cm/51-200 cm/over 200 cm)
 *        Fault zones nearby     : (YES/NO/Name of the zone)
 *          Distance/activity    : (multiple lines)
 *      Additional Information   : (multiple lines)
 * -----------------------------------------------------------------------------------------------------------
 */
@Component({
    moduleId: module.id,
    selector: 'site-identification',
    templateUrl: 'site-identification.component.html'
})
export class SiteIdentificationComponent implements OnInit {

    public isOpen: boolean = false;
    public miscUtils: any = MiscUtils;
    public siteIdentificationForm: FormGroup;
    public siteIdentification: SiteIdentificationViewModel;

    @Input('parentForm') parentForm: FormGroup;
    @Input('siteLogModel') siteLogModel: SiteLogViewModel;

    constructor(private userAuthService: UserAuthService,
                private formBuilder: FormBuilder,
                private changeDetectionRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.setupForm();
    }

    public getItemName(): string {
        return 'Site Identification';
    }

    public getControlName(): string {
        return 'siteIdentification';
    }

    public isFormDirty(): boolean {
        return this.siteIdentificationForm && this.siteIdentificationForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteIdentificationForm && this.siteIdentificationForm.invalid;
    }

    /**
     * Gets a value for the fourCharacterID field's readonly attribute
     * based on whether the user is editing a site or is making a new site.
     */
    public getFourCharacterIdReadOnlyAttribute(): string {
        return this.siteIdentification && this.siteIdentification.fourCharacterID ? 'readonly' : null;
    }

    private setupForm() {
        this.siteIdentificationForm = this.formBuilder.group({
            siteName: ['', [Validators.maxLength(50)]],
            fourCharacterID: ['', [Validators.minLength(4), Validators.maxLength(25)]],
            monumentInscription: ['', [Validators.maxLength(100)]],
            iersDOMESNumber: ['', [Validators.maxLength(50)]],
            cdpNumber: ['', [Validators.maxLength(25)]],
            monumentDescription: ['', [Validators.maxLength(100)]],
            heightOfTheMonument: '',
            monumentFoundation: ['', [Validators.maxLength(50)]],
            foundationDepth: '',
            markerDescription: ['', [Validators.maxLength(100)]],
            dateInstalled: [''],
            geologicCharacteristic: ['', [Validators.maxLength(100)]],
            bedrockType: ['', [Validators.maxLength(50)]],
            bedrockCondition: ['', [Validators.maxLength(50)]],
            fractureSpacing: ['', [Validators.maxLength(50)]],
            faultZonesNearby: ['', [Validators.maxLength(50)]],
            distanceActivity: ['', [Validators.maxLength(50)]],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
        this.siteIdentification = this.siteLogModel.siteInformation.siteIdentification;
        this.siteIdentificationForm.setValue(this.siteIdentification);
        if (this.userAuthService.hasAuthorityToEditSite()) {
            this.siteIdentificationForm.enable();
        } else {
            this.siteIdentificationForm.disable();
        }
        this.parentForm.addControl('siteIdentification', this.siteIdentificationForm);
    }
}
