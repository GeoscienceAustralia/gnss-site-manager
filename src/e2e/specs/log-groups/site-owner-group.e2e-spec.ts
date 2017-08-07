import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';

describe('Responsible Party - Site Owner Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let itemName: string = 'Site Owner';
    let siteId: string = 'ADE1';
    let noOfItems: number = 0;
    let canAddNewItem: boolean = false;
    let newValues: any = {};

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: ResponsiblePartyGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.siteOwnerGroup;
        newValues = itemGroup.getNewItemValues(timestamp);
        browser.waitForAngular();

        itemGroup.partyItems.count().then((value: number) => {
            canAddNewItem = (value === 0);
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before testing: ' + value);
        });
        browser.waitForAngular();
    });

    /**
     * Cache original input values and then delete the item if an item exists but no "New Site Owner" button available
     */
    it('expect should be able to delete an existing ' + itemName + ' item', () => {
        if(!canAddNewItem) {
            siteLogPage.siteInformationHeader.click().then(() => {
                console.log('Open Site Information Header');
            });
            itemGroup.itemGroupHeader.click().then(() => {
                console.log('Open ' + itemGroup.itemName + ' group');
            });
            itemGroup.individualNameInput.getAttribute('value').then((value: string) => {
                newValues.individualName = value;
                console.log('Cache individualName value: ' + value);
            });
            itemGroup.organisationNameInput.getAttribute('value').then((value: string) => {
                newValues.organisationName = value;
                console.log('Cache organisationName value: ' + value);
            });
            itemGroup.positionNameInput.getAttribute('value').then((value: string) => {
                newValues.positionName = value;
                console.log('Cache positionName value: ' + value);
            });
            itemGroup.deliveryPointInput.getAttribute('value').then((value: string) => {
                newValues.deliveryPoint = value;
                console.log('Cache deliveryPoint value: ' + value);
            });
            itemGroup.cityInput.getAttribute('value').then((value: string) => {
                newValues.city = value;
                console.log('Cache city value: ' + value);
            });
            itemGroup.administrativeAreaInput.getAttribute('value').then((value: string) => {
                newValues.administrativeArea = value;
                console.log('Cache administrativeArea value: ' + value);
            });
            itemGroup.postalCodeInput.getAttribute('value').then((value: string) => {
                newValues.postalCode = value;
                console.log('Cache postalCode value: ' + value);
            });
            itemGroup.countryInput.getAttribute('value').then((value: string) => {
                newValues.country = value;
                console.log('Cache country value: ' + value);
            });
            itemGroup.emailInput.getAttribute('value').then((value: string) => {
                newValues.email = value;
                console.log('Cache email value: ' + value);
            });
            itemGroup.primaryPhoneInput.getAttribute('value').then((value: string) => {
                newValues.primaryPhone = value;
                console.log('Cache primaryPhone value: ' + value);
            });
            itemGroup.secondaryPhoneInput.getAttribute('value').then((value: string) => {
                newValues.secondaryPhone = value;
                console.log('Cache secondaryPhone value: ' + value);
            });
            itemGroup.faxInput.getAttribute('value').then((value: string) => {
                newValues.fax = value;
                console.log('Cache fax value: ' + value);
            });

            // Note: must click to lose it as it will be opened in deleteItem() function
            itemGroup.itemGroupHeader.click().then(() => {
                console.log('Open ' + itemGroup.itemName + ' group @');
            });

            browser.waitForAngular();
            itemGroup.deleteItem(0);
            siteLogPage.save();
            noOfItems -= 1;
            browser.waitForAngular();
            siteLogPage.reload(siteId);
            browser.waitForAngular();
        }
    });

    it('expect should be able to add and save new ' + itemName + ' item', () => {
        siteLogPage.siteInformationHeader.click();
        itemGroup.addNewItem();
        TestUtils.checkItemCount(itemGroup.partyItems, 'adding new item', noOfItems + 1);
        itemGroup.individualNameInput.sendKeys(newValues.individualName);
        itemGroup.organisationNameInput.sendKeys(newValues.organisationName);
        itemGroup.positionNameInput.sendKeys(newValues.positionName);
        itemGroup.deliveryPointInput.sendKeys(newValues.deliveryPoint);
        itemGroup.cityInput.sendKeys(newValues.city);
        itemGroup.administrativeAreaInput.sendKeys(newValues.administrativeArea);
        itemGroup.postalCodeInput.sendKeys(newValues.postalCode);
        itemGroup.countryInput.sendKeys(newValues.country);
        itemGroup.emailInput.sendKeys(newValues.email);
        itemGroup.primaryPhoneInput.sendKeys(newValues.primaryPhone);
        itemGroup.secondaryPhoneInput.sendKeys(newValues.secondaryPhone);
        itemGroup.faxInput.sendKeys(newValues.fax);
        browser.waitForAngular();
        siteLogPage.save();
    });

    it('expect should have all input values for the new ' + itemName + ' item', () => {
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click();
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
            browser.waitForAngular();
            TestUtils.checkInputValueEqual(itemGroup.individualNameInput, 'Individual Name', newValues.individualName);
            TestUtils.checkInputValueEqual(itemGroup.organisationNameInput, 'Organisation Name', newValues.organisationName);
            TestUtils.checkInputValueEqual(itemGroup.positionNameInput, 'Position Name', newValues.positionName);
            TestUtils.checkInputValueEqual(itemGroup.deliveryPointInput, 'Address', newValues.deliveryPoint);
            TestUtils.checkInputValueEqual(itemGroup.cityInput, 'City', newValues.city);
            TestUtils.checkInputValueEqual(itemGroup.administrativeAreaInput, 'State / Province', newValues.administrativeArea);
            TestUtils.checkInputValueEqual(itemGroup.postalCodeInput, 'Postal Code', newValues.postalCode);
            // TODO: country is missing from both data and view models, so its value won't be saved
            //TestUtils.checkInputValueEqual(itemGroup.countryInput, 'Country', newValues.country);
            TestUtils.checkInputValueEqual(itemGroup.emailInput, 'Email', newValues.email);
            TestUtils.checkInputValueEqual(itemGroup.primaryPhoneInput, 'Primary Phone Number', newValues.primaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.secondaryPhoneInput, 'Secondary Phone Number', newValues.secondaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.faxInput, 'Fax Number', newValues.fax);
        });
    });

    it('expect should be able to delete a ' + itemName + ' item added previously', () => {
        if(canAddNewItem) {
            siteLogPage.reload(siteId);
            siteLogPage.siteInformationHeader.click();
            itemGroup.deleteItem(0);
            siteLogPage.save();
            siteLogPage.reload(siteId);
            TestUtils.checkItemCount(itemGroup.partyItems, 'deleting an item', noOfItems);
        }
    });
});
