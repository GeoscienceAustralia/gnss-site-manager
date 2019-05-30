import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';
import { ResponsiblePartyType } from './responsible-party-group.component';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { DialogService } from '../shared/global/dialog.service';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single responsible party.
 *
 * CI Address
 * ------------------------------------------------------------------------
 * 	deliveryPoint 	        0..*    Street address
 * 	city 	                0..1
 * 	administrativeArea 	    0..1 	State or provence
 * 	postalCode 	            0..1 	Zip code
 * 	country 	            0..1
 * 	electronicMailAddress 	0..* 	Email
 * ------------------------------------------------------------------------
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-responsible-party-item',
    templateUrl: 'responsible-party-item.component.html',
})
export class ResponsiblePartyItemComponent extends AbstractItemComponent implements OnInit {

    @Input() responsibleParty: ResponsiblePartyViewModel;
    @Input() partyType: ResponsiblePartyType;
    @Input() isMandatory: boolean;
    protected isDataType: boolean;
    protected isMetadataCustodian: boolean;
    protected isDataCenter: boolean;
    protected itemIdName: string;

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
        this.isItemEditable = true;
    }

    ngOnInit() {
        super.ngOnInit();
        this.isItemOpen = (this.index === 0);
        this.itemIdName = _.kebabCase(this.getItemName());
    }

    getItem(): AbstractViewModel {
        return this.responsibleParty;
    }

    getItemName(): string {
        return this.partyType.getTitle();
    }

    /**
     * Return the item header label in HTML format, including individual name and organisation name.
     *
     * Note: it will be used for SiteContact and SiteDataCenter if they have multiple items. In smaller screen devices,
     * the organisation names will be hidden from the headers.
     */
    public getItemHeaderHtml(): string {
        let headerHtml: string = '';
        if (!this.isDataType && this.itemGroup.controls['individualName']) {
            headerHtml = this.itemGroup.controls['individualName'].value;
        }
        let organisationName: string = (this.itemGroup.controls['organisationName'] ?
                                        this.itemGroup.controls['organisationName'].value : '');
        if (organisationName) {
            if (headerHtml) {
                headerHtml += ' <span class="hidden-xsm">(' + organisationName + ')</span>';
            } else {
                headerHtml = '<span>' + organisationName + ' </span>';
            }
        }

        return (headerHtml ? headerHtml : 'New ' + this.partyType.getTitle());
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        this.isDataType = this.partyType.getObjectName() === 'siteDataCenters'
                       || this.partyType.getObjectName() === 'siteDataSource';
        this.isMetadataCustodian = this.partyType.getObjectName() === 'siteMetadataCustodian';
        this.isDataCenter = this.partyType.getObjectName() === 'siteDataCenters';

        let individualNameValidators: any[] = !this.isDataType ? [Validators.required] : [];
        individualNameValidators.push(Validators.maxLength(200));

        let organisationValidators: any[] = (this.isDataType || this.isMetadataCustodian) ? [Validators.required] : [];
        organisationValidators.push(Validators.maxLength(200));

        return this.formBuilder.group({
            id: [null],
            individualName: ['', individualNameValidators],
            organisationName: ['', organisationValidators],
            positionName: ['', [Validators.maxLength(100)]],
            deliveryPoint: ['', [Validators.maxLength(2000)]],
            city: ['', [Validators.maxLength(100)]],
            administrativeArea: ['', [Validators.maxLength(100)]],
            postalCode: ['', [Validators.maxLength(25)]],
            country: [''],
            email: [''],
            primaryPhone: ['', [Validators.maxLength(25)]],
            secondaryPhone: ['', [Validators.maxLength(25)]],
            fax: ['', [Validators.maxLength(25)]],
            url: [''],
        });
    }

    /**
     * Remove an item from the UI and delete if it is an existing record.
     */
    removeItem(index: number): boolean {
      if (this.isNew) {
        this.cancelNew(index);
      } else {
          this.dialogService.confirmDeleteDialogWithNoReason(
            this.getItemName(),
            () => {  // ok callback - no reason needed
               this.deleteItem(index, null);
                this.itemGroup.markAsDirty();
            },
            () => {  // cancel callback
              console.log('delete cancelled by user');
            }
          );
      }
      return false; // same as 'event.preventDefault()` (which I'm having trouble as cant get event parameter)
    }

    /**
     * Allow items to deal with total number of items change
     */
    protected handleTotalChange(currentValue: number, previousValue: number): void {
        if (currentValue === 1) {
            this.isItemOpen = true;
        }
    }
}
