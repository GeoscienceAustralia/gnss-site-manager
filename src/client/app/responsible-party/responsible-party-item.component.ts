import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';
import { PARTY_TYPES } from './responsible-party-group.component';
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
    @Input() partyType: string;
    @Input() isMandatory: boolean;
    protected isDataType: boolean;
    protected isMetadataCustodian: boolean;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService,
                protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.isOpen = (this.index === 0);
        this.isDataType = this.partyType === 'siteDataCenters'
                       || this.partyType === 'siteDataSource';
        this.isMetadataCustodian = this.partyType === 'siteMetadataCustodian';
    }

    getItem(): AbstractViewModel {
        return this.responsibleParty;
    }

    getItemName(): string {
        return PARTY_TYPES[this.partyType];
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

        return (headerHtml ? headerHtml : 'New ' + this.getItemName());
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        let organisationValidators: any[] = this.isDataType ? [Validators.required, Validators.maxLength(100)]
                                                            : [Validators.maxLength(100)];
        return new ItemControls([
            {individualName: new FormControl('', [Validators.maxLength(100)])},
            {organisationName: new FormControl('', organisationValidators)},
            {positionName: new FormControl('', [Validators.maxLength(50)])},
            {deliveryPoint: new FormControl('', [Validators.maxLength(50)])},
            {city: new FormControl('', [Validators.maxLength(50)])},
            {administrativeArea: new FormControl('', [Validators.maxLength(50)])},
            {postalCode: new FormControl('', [Validators.maxLength(25)])},
            {country: new FormControl('')}, //, [Validators.maxLength(2000)]],
            {email: new FormControl('', [Validators.maxLength(50)])},
            {phone: new FormControl('', [Validators.maxLength(25)])},
            {fax: new FormControl('', [Validators.maxLength(25)])},
        ]);
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
            this.isOpen = true;
        }
    }
}
