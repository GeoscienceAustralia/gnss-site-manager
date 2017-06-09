import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../shared/global/user-auth.service';
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

    @Input()
    set siteLogModel(siteLogModel: any) {
        if  (!siteLogModel
             || !siteLogModel.siteIdentification
             || Object.keys(siteLogModel.siteIdentification).length === 0) {
            this.siteIdentification = new SiteIdentificationViewModel();
        } else {
            this.siteIdentification = siteLogModel.siteIdentification;
            this.siteIdentificationForm.setValue(this.siteIdentification);
        }
    }

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

    private setupForm() {
        this.siteIdentificationForm = this.formBuilder.group({
            siteName: ['', [Validators.maxLength(50)]],
            // '     ' prevents validation error at start
            fourCharacterID: ['     ', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
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
        if (this.userAuthService.hasAuthorityToEditSite()) {
            this.siteIdentificationForm.enable();
        } else {
            this.siteIdentificationForm.disable();
        }
        this.parentForm.addControl('siteIdentification', this.siteIdentificationForm);
    }
}
