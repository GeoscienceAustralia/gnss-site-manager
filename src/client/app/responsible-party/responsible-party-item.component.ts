import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';
import { ResponsiblePartyType } from './responsible-party-group.component';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { DialogService } from '../shared/global/dialog.service';

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

    constructor(protected dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.isOpen = (this.index === 0);
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
        if (this.responsibleParty.individualName) {
            headerHtml = this.responsibleParty.individualName;
        }

        if (this.responsibleParty.organisationName) {
            if (headerHtml) {
                headerHtml += ' <span class="hidden-xsm">(' + this.responsibleParty.organisationName + ')</span>';
            } else {
                headerHtml = '<span>' + this.responsibleParty.organisationName + ' </span>';
            }
        }

        return (headerHtml ? headerHtml : 'New ' + this.partyType.getTitle());
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
            {individualName: new FormControl('')},//, [Validators.required, Validators.minLength(100)]],
            {organisationName: new FormControl('')},//, [Validators.required, Validators.maxLength(100)]],
            {positionName: new FormControl('')},
            {deliveryPoint: new FormControl('')},
            {city: new FormControl('')},
            {administrativeArea: new FormControl('')},//, [Validators.required]],
            {postalCode: new FormControl('')},
            {country: new FormControl('')}, //, [Validators.maxLength(2000)]],
            {email: new FormControl('')},
            {phone: new FormControl('')},
            {fax: new FormControl('')},
            {objectMap: new FormControl('')},
            {startDate: new FormControl('')},
            {endDate: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }
}
