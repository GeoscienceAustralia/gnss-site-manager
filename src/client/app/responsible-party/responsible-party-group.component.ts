import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';

// Enum version wouldn't work in templates.  Can't have strings in enums.
export class ResponsiblePartyType {
    static siteContact = new ResponsiblePartyType('siteContact', 'Site Contact');
    static siteMetadataCustodian = new ResponsiblePartyType('siteMetadataCustodian', 'Site Metadata Custodian');
    static siteDataCenter = new ResponsiblePartyType('siteDataCenter', 'Site Data Center');
    static siteDataSource = new ResponsiblePartyType('siteDataSource', 'Site Data Source');

    constructor(private value: string, private title: string) {
    }

    toString() {
        return this.value;
    }

    getTitle(): string {
        return this.title;
    }
}

/**
 * This class represents the responsible parties.  It is used for 4 different types.  May be 1+ of each except where noted.
 * This group will contain each one as an item (even if only 1).
 *
 * 1. Site Contact
 * 2. Site Metadata Custodian (1 only)
 * 3. Site Date Center
 * 4. Site Date Source
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-responsible-party-group',
    templateUrl: 'responsible-party-group.component.html',
})
export class ResponsiblePartyGroupComponent extends AbstractGroup<ResponsiblePartyViewModel> implements OnInit {
    private _partyName: ResponsiblePartyType;

    static compare(obj1: ResponsiblePartyViewModel, obj2: ResponsiblePartyViewModel): number {
        let name1: string = obj1.individualName;
        let name2: string = obj2.individualName;
        return name1.localeCompare(name2);
    }

    @Input()
    set partyName(partyName: ResponsiblePartyType) {
        this._partyName = partyName;
    }

    get partyName(): ResponsiblePartyType {
        return this._partyName;
    }


    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel[this.partyName.toString()]);
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel[this.partyName.toString()]);
        }
    }

    constructor() {
        super();
    }

    ngOnInit() {
        if (!this.partyName) {
            throw new Error('Party attribute is required for ResponsiblePartyGroupComponent');
        } else {
        }

        this.unlimitedItems = (this.partyName !== ResponsiblePartyType.siteMetadataCustodian);
        this.setupForm();
    }

    getItemName(): string {
        return this.partyName.getTitle();
    }

    compare(obj1: ResponsiblePartyViewModel, obj2: ResponsiblePartyViewModel): number {
        return ResponsiblePartyGroupComponent.compare(obj1, obj2);
    }

    newViewModelItem(blank?: boolean): ResponsiblePartyViewModel {
        return new ResponsiblePartyViewModel(blank);
    }

    private setupForm() {
        this.groupArrayForm = new FormArray([]);
        this.siteInfoForm.addControl(this.partyName.toString(), this.groupArrayForm);
    }
}
