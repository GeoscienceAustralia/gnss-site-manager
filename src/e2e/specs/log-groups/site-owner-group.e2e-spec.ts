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
    let individualName: string = 'Homer Simpson';
    let organisationName: string = 'Geoscience Australia';
    let positionName: string = 'Manager ' + timestamp;
    let deliveryPoint: string = 'Cnr Jerrabomberra Ave and Hindmarsh Drive';
    let city: string = 'Symonston';
    let administrativeArea: string = 'ACT';
    let postalCode: string = '2609';
    let country: string = 'Australia';
    let email: string = 'Homer.Simpson@ga.gov.au';
    let primaryPhone: string = '0262499997';
    let secondaryPhone: string = '0262499998';
    let fax: string = '0262499999';
    let url: string = 'http://www.ga.gov.au';

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
                individualName = value;
                console.log('Cache individualName value: ' + value);
            });
            itemGroup.organisationNameInput.getAttribute('value').then((value: string) => {
                organisationName = value;
                console.log('Cache organisationName value: ' + value);
            });
            itemGroup.positionNameInput.getAttribute('value').then((value: string) => {
                positionName = value;
                console.log('Cache positionName value: ' + value);
            });
            itemGroup.deliveryPointInput.getAttribute('value').then((value: string) => {
                deliveryPoint = value;
                console.log('Cache deliveryPoint value: ' + value);
            });
            itemGroup.cityInput.getAttribute('value').then((value: string) => {
                city = value;
                console.log('Cache city value: ' + value);
            });
            itemGroup.administrativeAreaInput.getAttribute('value').then((value: string) => {
                administrativeArea = value;
                console.log('Cache administrativeArea value: ' + value);
            });
            itemGroup.postalCodeInput.getAttribute('value').then((value: string) => {
                postalCode = value;
                console.log('Cache postalCode value: ' + value);
            });
            itemGroup.countryInput.getAttribute('value').then((value: string) => {
                country = value;
                console.log('Cache country value: ' + value);
            });
            itemGroup.emailInput.getAttribute('value').then((value: string) => {
                email = value;
                console.log('Cache email value: ' + value);
            });
            itemGroup.primaryPhoneInput.getAttribute('value').then((value: string) => {
                primaryPhone = value;
                console.log('Cache primaryPhone value: ' + value);
            });
            itemGroup.secondaryPhoneInput.getAttribute('value').then((value: string) => {
                secondaryPhone = value;
                console.log('Cache secondaryPhone value: ' + value);
            });
            itemGroup.faxInput.getAttribute('value').then((value: string) => {
                fax = value;
                console.log('Cache fax value: ' + value);
            });
            if (itemGroup.hasUrlField()) {
                itemGroup.urlInput.getAttribute('value').then((value: string) => {
                    url = value;
                });
            }

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
        itemGroup.individualNameInput.sendKeys(individualName);
        itemGroup.organisationNameInput.sendKeys(organisationName);
        itemGroup.positionNameInput.sendKeys(positionName);
        itemGroup.deliveryPointInput.sendKeys(deliveryPoint);
        itemGroup.cityInput.sendKeys(city);
        itemGroup.administrativeAreaInput.sendKeys(administrativeArea);
        itemGroup.postalCodeInput.sendKeys(postalCode);
        itemGroup.countryInput.sendKeys(country);
        itemGroup.emailInput.sendKeys(email);
        itemGroup.primaryPhoneInput.sendKeys(primaryPhone);
        itemGroup.secondaryPhoneInput.sendKeys(secondaryPhone);
        itemGroup.faxInput.sendKeys(fax);
        if (itemGroup.hasUrlField()) {
            itemGroup.urlInput.sendKeys(url);
        }
        browser.waitForAngular();
        siteLogPage.save();
    });

    it('expect should have all input values for the new ' + itemName + ' item', () => {
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click();
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
            browser.waitForAngular();
            TestUtils.checkInputValueEqual(itemGroup.individualNameInput, 'Individual Name', individualName);
            TestUtils.checkInputValueEqual(itemGroup.organisationNameInput, 'Organisation Name', organisationName);
            TestUtils.checkInputValueEqual(itemGroup.positionNameInput, 'Position Name', positionName);
            TestUtils.checkInputValueEqual(itemGroup.deliveryPointInput, 'Address', deliveryPoint);
            TestUtils.checkInputValueEqual(itemGroup.cityInput, 'City', city);
            TestUtils.checkInputValueEqual(itemGroup.administrativeAreaInput, 'State / Province', administrativeArea);
            TestUtils.checkInputValueEqual(itemGroup.postalCodeInput, 'Postal Code', postalCode);
            // TODO: country is missing from both data and view models, so its value won't be saved
            //TestUtils.checkInputValueEqual(itemGroup.countryInput, 'Country', country);
            TestUtils.checkInputValueEqual(itemGroup.emailInput, 'Email', email);
            TestUtils.checkInputValueEqual(itemGroup.primaryPhoneInput, 'Primary Phone Number', primaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.secondaryPhoneInput, 'Secondary Phone Number', secondaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.faxInput, 'Fax Number', fax);
            if (itemGroup.hasUrlField()) {
                TestUtils.checkInputValueEqual(itemGroup.urlInput, 'URL', url);
            }
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
