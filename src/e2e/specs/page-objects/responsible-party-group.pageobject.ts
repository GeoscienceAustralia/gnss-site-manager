import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

/*
 * The Responsible-Party Group page object is shared by Site Owner, Site Contacts, Site Metadata Custodian,
 * Site Data Centers and Site Data Source groups under Site-Information
 */
export class ResponsiblePartyGroup extends LogItemGroup {

    readonly individualNameInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="individualName"] input'));
    readonly organisationNameInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="organisationName"] input'));
    readonly positionNameInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="positionName"] input'));
    readonly deliveryPointInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="deliveryPoint"] input'));
    readonly cityInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="city"] input'));
    readonly administrativeAreaInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="administrativeArea"] input'));
    readonly postalCodeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="postalCode"] input'));
    readonly countryInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="country"] input'));
    readonly emailInput: ElementFinder = this.currentItemContainer
                    .element(by.css('email-input[controlName="email"] input'));
    readonly primaryPhoneInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="primaryPhone"] input'));
    readonly secondaryPhoneInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="secondaryPhone"] input'));
    readonly faxInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="fax"] input'));
    readonly urlInput: ElementFinder = this.currentItemContainer
                    .element(by.css('url-input[controlName="url"] input'));
    readonly partyItems: ElementArrayFinder;

    public constructor(partyName: string) {
        super(partyName);
        this.partyItems = element(by.cssContainingText('.panel-level-2', this.getGroupName()))
                         .all(by.css('gnss-responsible-party-item'));
    }

    public getGroupName(): string {
       let groupName: string = this.itemName;
       if (this.itemName === 'Site Contact' || this.itemName === 'Site Data Center') {
            groupName += 's';
       }
       return groupName;
    }

    public hasUrlField(): boolean {
        return this.itemName === 'Site Data Center';
    }
}
