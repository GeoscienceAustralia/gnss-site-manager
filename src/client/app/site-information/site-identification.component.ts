import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { SiteIdentificationViewModel } from './site-identification-view-model';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { UserAuthService } from '../shared/global/user-auth.service';
import { DialogService } from '../shared/index';
import { SiteLogService } from '../shared/site-log/site-log.service';

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
export class SiteIdentificationComponent extends AbstractItemComponent {

    @Input() parentForm: FormGroup;
    @Input() siteIdentification: SiteIdentificationViewModel;

    /**
    * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
    * @type {{name: EventNames}}
    */
    //private geodesyEvent: GeodesyEvent = new GeodesyEvent(EventNames.none);

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder,
                private changeDetectionRef: ChangeDetectorRef) {
        super(userAuthService, dialogService, siteLogService);
    }

    /**
     * Override parent's setupForm() method to deal with single form group, instead of form array.
     *
     */
    setupForm() {
        this.itemGroup = this.getItemForm();
        this.itemGroup.patchValue(this.getItem());
        this.parentForm.addControl('siteIdentification', this.itemGroup);
    }

    public getItemName(): string {
        return 'Site Identification';
    }

    public getControlName(): string {
        return 'siteIdentification';
    }

    /**
     * Gets a value for the fourCharacterID field's readonly attribute
     * based on whether the user is editing a site or is making a new site.
     */
    public getFourCharacterIdReadOnlyAttribute(): string {
        return this.siteIdentification && this.siteIdentification.fourCharacterID ? 'readonly' : null;
    }

    getItem(): AbstractViewModel {
        return this.siteIdentification;
    }

    getItemForm(): FormGroup {
        return this.formBuilder.group({
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
    }
}
