import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { UserAuthService } from '../shared/global/user-auth.service';
import { DialogService } from '../shared/index';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { SiteLocationViewModel } from './site-location-view-model';
import * as _ from 'lodash';

/**
 * This class represents the SiteLocation sub-component under the SiteInformation Component.
 *
 * Main fields of Site Location (from https://igscb.jpl.nasa.gov/igscb/station/general/blank.log):
 *     City or Town             :
 *     State or Province        :
 *     Country                  :
 *     Tectonic Plate           :
 *     Approximate Position (ITRF)
 *       X coordinate (m)       :
 *       Y coordinate (m)       :
 *       Z coordinate (m)       :
 *       Latitude (N is +)      : (+/-DDMMSS.SS)
 *       Longitude (E is +)     : (+/-DDDMMSS.SS)
 *       Elevation (m,ellips.)  : (F7.1)
 *     Additional Information   : (multiple lines)
 *
 */
@Component({
    moduleId: module.id,
    selector: 'site-location',
    templateUrl: 'site-location.component.html'
})
export class SiteLocationComponent extends AbstractItemComponent implements OnDestroy {
    public isCartesianPositionRequired: boolean = false;
    public isGeodeticPositionRequired: boolean = false;

    @Input() parentForm: FormGroup;
    @Input() siteLocation: SiteLocationViewModel;

    public cartesianPositionForm: FormGroup;
    public geodeticPositionForm: FormGroup;
    private cartesianSubscription: Subscription;
    private geodeticSubscription: Subscription;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.cartesianSubscription.unsubscribe();
        this.geodeticSubscription.unsubscribe();
    }

    /**
     * Override parent's setupForm() method to deal with single form group, instead of form array.
     *
     */
    setupForm() {
        this.itemGroup = this.getItemForm();
        this.itemGroup.patchValue(this.getItem());
        this.parentForm.addControl('siteLocation', this.itemGroup);
    }

    getItemName(): string {
        return 'Site Location';
    }

    getControlName(): string {
        return 'siteLocation';
    }

    getElementName(): string {
        return _.kebabCase(this.getItemName());
    }

    getItem(): AbstractViewModel {
        return this.siteLocation;
    }

    getItemForm(): FormGroup {
        this.cartesianPositionForm = this.formBuilder.group({
            x: '',
            y: '',
            z: ''
        });
        // Validators are applied in handleLocationPositionGroupChange.
        // Validators.required is added to those listed (conditionally when the group has at least one value)
        let cartesianPositionFormValidators: ValidatorFn[] = [];
        this.cartesianSubscription = this.cartesianPositionForm.valueChanges.subscribe(
            (change: any) => {
            this.isCartesianPositionRequired = this.handleLocationPositionGroupChange(change,
                                    this.cartesianPositionForm, cartesianPositionFormValidators);
            }
        );
        this.geodeticPositionForm = this.formBuilder.group({
            lat: '',
            lon: '',
            height: ''
        });
        // Validators are applied in handleLocationPositionGroupChange.
        // Validators.required is added to those listed (conditionally when the group has at least one value)
        let geodeticPositionFormValidators: ValidatorFn[] = [];
        this.geodeticSubscription = this.geodeticPositionForm.valueChanges.subscribe(
            (change: any) => {
                this.isGeodeticPositionRequired = this.handleLocationPositionGroupChange(change,
                                    this.geodeticPositionForm, geodeticPositionFormValidators);
            }
        );
        return this.formBuilder.group({
            city: ['', [Validators.maxLength(100)]],
            state: ['', [Validators.maxLength(100)]],
            countryCodeISO: ['', [Validators.maxLength(10)]],
            cartesianPosition: this.cartesianPositionForm,
            geodeticPosition: this.geodeticPositionForm,
            tectonicPlate: ['', [Validators.maxLength(100)]],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }

    /**
     * The groups we have here are all or nothing.  The validators.required is set on each field in Geodetic Position and
     * cartesian Position but when no fields have a value then the group is optional.
     *
     * @param groupItems - the group items values that come from an OnChange subscription
     * @param positionGroup - the FormGroup that holds the items
     * @returns {boolean} a flag indicating whether any fields have valid values
     */
    private handleLocationPositionGroupChange(groupItems: any, positionGroup: FormGroup, permanentValidators: ValidatorFn[]): boolean {
        let someFieldHasValue: boolean = false;
        Object.keys(groupItems).forEach((key) => {
            if (groupItems[key] != null) {
                someFieldHasValue = true;
            }
        });

        // If any group Item form field has a value then all are required
        Object.keys(groupItems).forEach((key) => {
            let itemControl: AbstractControl = positionGroup.controls[key];
            if (!itemControl) {
                throw new Error(`Control for group item: ${key} doesnt exist in positionGroup: ${positionGroup}`);
            }
            if (someFieldHasValue) {
                itemControl.setValidators(_.concat(permanentValidators, Validators.required));
                itemControl.updateValueAndValidity({emitEvent: false});
            } else {
                itemControl.clearValidators();
                itemControl.updateValueAndValidity({emitEvent: false});
            }
        });

        return someFieldHasValue;
    }
}
