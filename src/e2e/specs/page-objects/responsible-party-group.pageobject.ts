import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { mockResponsibleParty } from './view-model';

/*
 * The Responsible-Party Group page object is shared by groups of Site Owner, Site Contacts, Site Metadata Custodian,
 * Site Data Centers and Site Data Source under Site-Information
 *     - Site Owner: 0 - 1 optional
 *     - Site Contact: 0 - n optional
 *     - Site Data Center: 0 - n optional
 *     - Site Data Source: 0 - 1 optional
 *     - Site Metadata Custodian: 1 mandatory
 */
export class ResponsiblePartyGroup extends LogItemGroup {

    public individualNameInput: ElementFinder;
    public organisationNameInput: ElementFinder;
    public positionNameInput: ElementFinder;
    public deliveryPointInput: ElementFinder;
    public cityInput: ElementFinder;
    public administrativeAreaInput: ElementFinder;
    public postalCodeInput: ElementFinder;
    public countryInput: ElementFinder;
    public emailInput: ElementFinder;
    public primaryPhoneInput: ElementFinder;
    public secondaryPhoneInput: ElementFinder;
    public faxInput: ElementFinder;
    public urlInput: ElementFinder;

    public canAddNewItem: boolean;
    private viewModel: ResponsiblePartyViewModel = mockResponsibleParty;
    private backupModel: any = {};

    public constructor(partyName: string) {
        super(partyName);
        this.items = element(by.cssContainingText('.panel-level-2', this.getGroupName()))
                            .all(by.css('gnss-responsible-party-item'));
        this.updateItemElements();  // by default, the new item is the first one before saving

        this.canAddNewItem = false;
        this.items.count().then((value: number) => {
            this.noOfItems = value;
            if (this.itemName === 'Site Contact' || this.itemName === 'Site Data Center') {
                this.canAddNewItem = true;
            } else if (this.noOfItems === 0) {
                this.canAddNewItem = true;
            }
        });
    }

    public getGroupName(): string {
       let groupName: string = this.itemName;
       if (this.itemName === 'Site Contact' || this.itemName === 'Site Data Center') {
            groupName += 's';
       }
       return groupName;
    }

    public addNewItemOrBackupValues() {
        this.itemGroupHeader.click().then(() => {
            if (this.canAddNewItem) {
                super.addNewItem();
            } else {
                this.changeValues(this.viewModel, this.backupModel);
            }
        });
    }

    public checkInputOrModifiedValues() {
        if (this.canAddNewItem) {
            this.checkInputValues();
        } else {
            this.checkModifiedValues();
        }
    }

    /**
     * Override parent method by adding
     */
    public checkInputValues() {
        this.updateNewItemElements(this.noOfItems + 1, this.viewModel.positionName);
        TestUtils.checkItemCount(this.items, 'adding new item', this.noOfItems + 1);
        this.itemGroupHeader.click().then(() => {
            console.log('    Open ' + this.itemName + ' group');
            if (this.noOfItems > 0) {
                this.currentItemHeader.click().then(() => {
                    this.checkValues();
                });
            } else {
                this.checkValues();
            }
        });
    }

    public deleteItemOrRestoreBackupValues() {
        if (this.canAddNewItem) {
            this.deleteItem();
        } else {
            this.restoreBackupValues();
        }
    }

    public checkItemDeletedOrBackupValues() {
        if (this.canAddNewItem) {
            this.checkItemDeleted();
        } else {
            this.checkBackupValues();
        }
    }

    protected fillOutNewItemForm() {
        this.individualNameInput.sendKeys(this.viewModel.individualName);
        this.organisationNameInput.sendKeys(this.viewModel.organisationName);
        this.positionNameInput.sendKeys(this.viewModel.positionName);
        this.deliveryPointInput.sendKeys(this.viewModel.deliveryPoint);
        this.cityInput.sendKeys(this.viewModel.city);
        this.administrativeAreaInput.sendKeys(this.viewModel.administrativeArea);
        this.postalCodeInput.sendKeys(this.viewModel.postalCode);
        this.countryInput.sendKeys(this.viewModel.country);
        this.emailInput.sendKeys(this.viewModel.email);
        this.primaryPhoneInput.sendKeys(this.viewModel.primaryPhone);
        this.secondaryPhoneInput.sendKeys(this.viewModel.secondaryPhone);
        this.faxInput.sendKeys(this.viewModel.fax);
    }

    protected checkValues(useBackupModel?: boolean) {
        let model: ResponsiblePartyViewModel = useBackupModel ? this.backupModel : this.viewModel;
        TestUtils.checkInputValueEqual(this.individualNameInput, 'Individual Name', model.individualName);
        TestUtils.checkInputValueEqual(this.organisationNameInput, 'Organisation Name', model.organisationName);
        TestUtils.checkInputValueEqual(this.positionNameInput, 'Position Name', model.positionName);
        TestUtils.checkInputValueEqual(this.deliveryPointInput, 'Address', model.deliveryPoint);
        TestUtils.checkInputValueEqual(this.cityInput, 'City', model.city);
        TestUtils.checkInputValueEqual(this.administrativeAreaInput, 'State / Province', model.administrativeArea);
        TestUtils.checkInputValueEqual(this.postalCodeInput, 'Postal Code', model.postalCode);
        TestUtils.checkInputValueEqual(this.countryInput, 'Country', model.country);
        TestUtils.checkInputValueEqual(this.emailInput, 'Email', model.email);
        TestUtils.checkInputValueEqual(this.primaryPhoneInput, 'Primary Phone Number', model.primaryPhone);
        TestUtils.checkInputValueEqual(this.secondaryPhoneInput, 'Secondary Phone Number', model.secondaryPhone);
        TestUtils.checkInputValueEqual(this.faxInput, 'Fax Number', model.fax);
    }

    private updateItemElements(itemIndex: number = 0) {
        let itemContainer: ElementFinder = this.getItemContainer(itemIndex);
        this.individualNameInput = itemContainer.element(by.css('text-input[controlName="individualName"] input'));
        this.organisationNameInput = itemContainer.element(by.css('text-input[controlName="organisationName"] input'));
        this.positionNameInput = itemContainer.element(by.css('text-input[controlName="positionName"] input'));
        this.deliveryPointInput = itemContainer.element(by.css('textarea-input[controlName="deliveryPoint"] textarea'));
        this.cityInput = itemContainer.element(by.css('text-input[controlName="city"] input'));
        this.administrativeAreaInput = itemContainer.element(by.css('text-input[controlName="administrativeArea"] input'));
        this.postalCodeInput = itemContainer.element(by.css('text-input[controlName="postalCode"] input'));
        this.countryInput = itemContainer.element(by.css('text-input[controlName="country"] input'));
        this.emailInput = itemContainer.element(by.css('email-input[controlName="email"] input'));
        this.primaryPhoneInput = itemContainer.element(by.css('text-input[controlName="primaryPhone"] input'));
        this.secondaryPhoneInput = itemContainer.element(by.css('text-input[controlName="secondaryPhone"] input'));
        this.faxInput = itemContainer.element(by.css('text-input[controlName="fax"] input'));
        this.urlInput = itemContainer.element(by.css('url-input[controlName="url"] input'));
    }

    private changeValues(model: ResponsiblePartyViewModel, backup: ResponsiblePartyViewModel = null) {
        TestUtils.changeInputValue(this.individualNameInput, 'individualName', model, backup);
        TestUtils.changeInputValue(this.organisationNameInput, 'organisationName', model, backup);
        TestUtils.changeInputValue(this.positionNameInput, 'positionName', model, backup);
        TestUtils.changeInputValue(this.deliveryPointInput, 'deliveryPoint', model, backup);
        TestUtils.changeInputValue(this.cityInput, 'city', model, backup);
        TestUtils.changeInputValue(this.administrativeAreaInput, 'administrativeArea', model, backup);
        TestUtils.changeInputValue(this.postalCodeInput, 'postalCode', model, backup);
        TestUtils.changeInputValue(this.countryInput, 'country', model, backup);
        TestUtils.changeInputValue(this.emailInput, 'email', model, backup);
        TestUtils.changeInputValue(this.primaryPhoneInput, 'primaryPhone', model, backup);
        TestUtils.changeInputValue(this.secondaryPhoneInput, 'secondaryPhone', model, backup);
        TestUtils.changeInputValue(this.faxInput, 'fax', model, backup);
    }

    /**
     * Find out the new responsibleParty item by its unique position name appended with timestamp
     */
    private updateNewItemElements(noOfItems: number, positionNameValue: string = null): void {
        if (noOfItems < 2 || !positionNameValue) {
            this.updateItemElements();
        } else {
            let positionNameInputs: ElementArrayFinder = element(by.cssContainingText('.panel-level-2', this.getGroupName()))
                                                         .all(by.css('text-input[controlName="positionName"] input'));
            positionNameInputs.each((element: ElementFinder, index: number) => {
                element.getAttribute('value').then((value: string) => {
                    if (value === positionNameValue) {
                        this.updateItemElements(index);
                        console.log('\tNew item index for ' + this.getGroupName() + ': ' + index);
                    }
                });
            });
        }
    }

    private checkModifiedValues() {
        this.itemGroupHeader.click().then(() => {
            console.log('    Open ' + this.itemName + ' group for checking modified values');
            this.checkValues();
        });
    }

    private restoreBackupValues() {
        console.log('    Open ' + this.itemName + ' group for restoring backup values');
        this.changeValues(this.backupModel);
    }

    private checkBackupValues(useBackupModel: boolean = false) {
        this.itemGroupHeader.click().then(() => {
            console.log('    Open ' + this.itemName + ' group for checking backup values');
            this.checkValues(true);
        });
    }
}
