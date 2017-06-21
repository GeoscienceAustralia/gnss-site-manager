import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';

export const PARTY_TYPES: any = {
    siteOwner: 'Site Owner',
    siteContacts: 'Site Contact',
    siteMetadataCustodian: 'Site Metadata Custodian',
    siteDataCenters: 'Site Data Center',
    siteDataSource: 'Site Data Source'
};

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
    templateUrl: 'responsible-party-group.component.html',
})
export class ResponsiblePartyGroupComponent extends AbstractGroupComponent<ResponsiblePartyViewModel> {

    @Input() partyType: string;
    @Input() isMandatory: boolean;
    @Input() isMultiple: boolean;

    public static compare(obj1: ResponsiblePartyViewModel, obj2: ResponsiblePartyViewModel): number {
        // TODO implement sorting (alphabetically by individual name perhaps)
        // make sure that the view model is sorted in sync with the data model
        return 0;
    }

    constructor(protected userAuthService: UserAuthService, protected formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    protected hasEndDateField(): boolean {
        return false;
    }

    getItemName(): string {
        return PARTY_TYPES[this.partyType];
    }

    getControlName(): string {
        return this.partyType;
    }

    getNewItemViewModel(): ResponsiblePartyViewModel {
        return new ResponsiblePartyViewModel();
    }
}
