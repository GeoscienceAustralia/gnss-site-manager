import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { mockResponsibleParty } from './view-model';

/**
 * Two conditional tests based on the requirements (0 - 1 optional Site Data Source):
 * 1) If there is a SiteDataSource item, cache all values and delete it, and then add a new one and fill with all values cached;
 * 2) Otherwise, add a new SiteDataSource item and fill it with new values provided, and delete the newly-created item at the end
 */
describe('Responsible Party - Site Data Source Group Component', () => {

    let viewModel: ResponsiblePartyViewModel = mockResponsibleParty;
    let siteId: string = 'ADE1';
    let noOfItems: number = 0;
    let canAddNewItem: boolean = false;

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
        itemGroup = siteLogPage.siteDataSourceGroup;
        browser.waitForAngular();

        itemGroup.partyItems.count().then((value: number) => {
            canAddNewItem = (value === 0);
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before testing: ' + value);
        });
        browser.waitForAngular();
    });

    it('expect should be able to delete an existing item', () => {
        if(!canAddNewItem) {
            siteLogPage.siteInformationHeader.click().then(() => {
                console.log('Open Site Information Header');
            });
            itemGroup.itemGroupHeader.click().then(() => {
                console.log('Open ' + itemGroup.itemName + ' group');
            });

            TestUtils.cacheInputValue(itemGroup.individualNameInput, 'individualName', viewModel);
            TestUtils.cacheInputValue(itemGroup.organisationNameInput, 'organisationName', viewModel);
            TestUtils.cacheInputValue(itemGroup.positionNameInput, 'positionName', viewModel);
            TestUtils.cacheInputValue(itemGroup.deliveryPointInput, 'deliveryPoint', viewModel);
            TestUtils.cacheInputValue(itemGroup.cityInput, 'city', viewModel);
            TestUtils.cacheInputValue(itemGroup.administrativeAreaInput, 'administrativeArea', viewModel);
            TestUtils.cacheInputValue(itemGroup.postalCodeInput, 'postalCode', viewModel);
            TestUtils.cacheInputValue(itemGroup.countryInput, 'country', viewModel);
            TestUtils.cacheInputValue(itemGroup.emailInput, 'email', viewModel);
            TestUtils.cacheInputValue(itemGroup.primaryPhoneInput, 'primaryPhone', viewModel);
            TestUtils.cacheInputValue(itemGroup.secondaryPhoneInput, 'secondaryPhone', viewModel);
            TestUtils.cacheInputValue(itemGroup.faxInput, 'fax', viewModel);

            // Note: must click again to close it as it will be opened in deleteItem() function
            itemGroup.itemGroupHeader.click().then(() => {
                console.log('Open ' + itemGroup.itemName + ' group @');
            });

            browser.waitForAngular();
            itemGroup.deleteItem();
            siteLogPage.save();
            noOfItems -= 1;
            browser.waitForAngular();
            siteLogPage.reload(siteId);
            browser.waitForAngular();
        }
    });

    it('expect should be able to add and save new item', () => {
        siteLogPage.siteInformationHeader.click();
        itemGroup.addNewItem();
        TestUtils.checkItemCount(itemGroup.partyItems, 'adding new item', noOfItems + 1);
        itemGroup.individualNameInput.sendKeys(viewModel.individualName);
        itemGroup.organisationNameInput.sendKeys(viewModel.organisationName);
        itemGroup.positionNameInput.sendKeys(viewModel.positionName);
        itemGroup.deliveryPointInput.sendKeys(viewModel.deliveryPoint);
        itemGroup.cityInput.sendKeys(viewModel.city);
        itemGroup.administrativeAreaInput.sendKeys(viewModel.administrativeArea);
        itemGroup.postalCodeInput.sendKeys(viewModel.postalCode);
        itemGroup.countryInput.sendKeys(viewModel.country);
        itemGroup.emailInput.sendKeys(viewModel.email);
        itemGroup.primaryPhoneInput.sendKeys(viewModel.primaryPhone);
        itemGroup.secondaryPhoneInput.sendKeys(viewModel.secondaryPhone);
        itemGroup.faxInput.sendKeys(viewModel.fax);
        browser.waitForAngular();
        siteLogPage.save();
    });

    it('expect should have all input values for the new item', () => {
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click();
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
            browser.waitForAngular();
            TestUtils.checkInputValueEqual(itemGroup.individualNameInput, 'Individual Name', viewModel.individualName);
            TestUtils.checkInputValueEqual(itemGroup.organisationNameInput, 'Organisation Name', viewModel.organisationName);
            TestUtils.checkInputValueEqual(itemGroup.positionNameInput, 'Position Name', viewModel.positionName);
            TestUtils.checkInputValueEqual(itemGroup.deliveryPointInput, 'Address', viewModel.deliveryPoint);
            TestUtils.checkInputValueEqual(itemGroup.cityInput, 'City', viewModel.city);
            TestUtils.checkInputValueEqual(itemGroup.administrativeAreaInput, 'State / Province', viewModel.administrativeArea);
            TestUtils.checkInputValueEqual(itemGroup.postalCodeInput, 'Postal Code', viewModel.postalCode);
            TestUtils.checkInputValueEqual(itemGroup.countryInput, 'Country', viewModel.country);
            TestUtils.checkInputValueEqual(itemGroup.emailInput, 'Email', viewModel.email);
            TestUtils.checkInputValueEqual(itemGroup.primaryPhoneInput, 'Primary Phone Number', viewModel.primaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.secondaryPhoneInput, 'Secondary Phone Number', viewModel.secondaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.faxInput, 'Fax Number', viewModel.fax);
        });
    });

    it('expect should be able to delete the item added previously', () => {
        if(canAddNewItem) {
            siteLogPage.reload(siteId);
            siteLogPage.siteInformationHeader.click();
            itemGroup.deleteItem();
            siteLogPage.save();
            siteLogPage.reload(siteId);
            TestUtils.checkItemCount(itemGroup.partyItems, 'deleting an item', noOfItems);
        }
    });
});
