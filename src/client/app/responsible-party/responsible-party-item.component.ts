import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { DialogService } from '../shared/index';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';
import { ResponsiblePartyType } from './responsible-party-group.component';

/**
 * This component represents a single Temperature Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-responsible-party-item',
    templateUrl: 'responsible-party-item.component.html',
})
export class ResponsiblePartyItemComponent extends AbstractItem implements OnInit {
    /**
     * The ResponsibleParty in question.
     */
    @Input() responsibleParty: ResponsiblePartyViewModel;

    @Input() partyName: ResponsiblePartyType;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.setupForm();
        this.patchForm();
    }

     protected patchForm() {
        this.itemGroup.setValue(this.responsibleParty);
    }

    getItemName(): string {
        return this.partyName.getTitle();
    }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators

            individualName: [''],//, [Validators.required, Validators.minLength(100)]],
            organisationName: [''],//, [Validators.required, Validators.maxLength(100)]],
            positionName: ['', []],
            deliveryPoint1: ['', []],
            deliveryPoint2: ['', []],
            city: ['', []],
            administrativeArea: [''],//, [Validators.required]],
            postalCode: ['', []],
            country: [''], //, [Validators.maxLength(2000)]],
            email1: '',
            email2: '',
            phone1: '',
            phone2: '',
            fax1: '',
            fax2: '',
            fieldMaps: '',
            dateInserted: '',
            dateDeleted: '',
            deletedReason: ''
        });
        this.addToGroupArray(this.itemGroup);
    }
}
