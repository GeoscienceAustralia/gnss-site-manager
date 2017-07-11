import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

// Enum version wouldn't work in templates.  Can't have strings in enums.
export class ResponsiblePartyType {
    static siteOwner = new ResponsiblePartyType('siteOwner', 'Site Owner');
    static siteContact = new ResponsiblePartyType('siteContacts', 'Site Contact');
    static siteMetadataCustodian = new ResponsiblePartyType('siteMetadataCustodian', 'Site Metadata Custodian');
    static siteDataCenter = new ResponsiblePartyType('siteDataCenters', 'Site Data Center');
    static siteDataSource = new ResponsiblePartyType('siteDataSource', 'Site Data Source');

    constructor(private value: string, private title: string) {
    }

    getObjectName(): string {
        return this.value;
    }

    getTitle(): string {
        return this.title;
    }
}

/**
 * This class represents the responsible parties, which have 5 different types.
 * This group will contain each one as its items (even if it has only 1 item).
 *
 * 1. Site Owner: mandatory, 1 only (object)
 * 2. Site Contact: mandatory, multiple (array)
 * 3. Site Metadata Custodian: mandatory, 1 only (object)
 * 4. Site Date Center: optional, multiple (array)
 * 5. Site Date Source: optional, 1 only (object)
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-responsible-party-group',
    templateUrl: '../shared/abstract-groups-items/abstract-group.component.html',
})
export class ResponsiblePartyGroupComponent extends AbstractGroupComponent<ResponsiblePartyViewModel> {

    @Input() isMandatory: boolean;
    protected _partyType: ResponsiblePartyType;
    protected panelLevel: number = 2;

    public static compare(obj1: ResponsiblePartyViewModel, obj2: ResponsiblePartyViewModel): number {
        // TODO implement sorting (alphabetically by individual name perhaps)
        // make sure that the view model is sorted in sync with the data model
        return 0;
    }

    protected hasEndDateField(): boolean {
        return false;
    }

    @Input()
    set partyType(partyType: ResponsiblePartyType) {
        this._partyType = partyType;
    }

    get partyType(): ResponsiblePartyType {
        return this._partyType;
    }

    constructor(protected siteLogService: SiteLogService, protected formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return this.partyType.getTitle();
    }

    getControlName(): string {
        return this.partyType.getObjectName();
    }

    getNewItemViewModel(): ResponsiblePartyViewModel {
        return new ResponsiblePartyViewModel();
    }
}
