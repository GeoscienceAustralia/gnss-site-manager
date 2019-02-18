import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { mockResponsibleParty } from './view-model';

/**
 * Test is based on the requirements (0 - n optional Site Data Centers):
 * 1) Add a new Data Center and fill with new values provided, and delete the new item at the end
 */
describe('Responsible Party - Site Data Center Group Component', () => {

    let viewModel: ResponsiblePartyViewModel = mockResponsibleParty;
    let siteId: string = 'ADE1';
    let noOfItems: number = 0;

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
        itemGroup = siteLogPage.siteDataCenterGroup;
        browser.waitForAngular();

        itemGroup.partyItems.count().then((value: number) => {
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before testing: ' + value);
        });
        browser.waitForAngular();
    });

    it('expect should be able to add and save new item', () => {
        siteLogPage.siteInformationHeader.click();
        itemGroup.addNewItem();
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
        itemGroup.urlInput.sendKeys(viewModel.url);
        browser.waitForAngular();
        siteLogPage.save();
        itemGroup.updateItemElements(noOfItems);  // the new item is the last one after saving
    });

    it('expect should have all new values saved for the new item', () => {
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.partyItems, 'adding new item', noOfItems + 1);
        siteLogPage.siteInformationHeader.click();
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
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
            // TODO: sendKeys() does not working with '//' on Chrome. For example, http://www.ga.gov.au -> http:www.ga.gov.au
            //TestUtils.checkInputValueEqual(itemGroup.urlInput, 'Fax Number', viewModel.url);
            console.log('All inputs have been changed to new values successfully.');
        });
    });

    it('expect should be able to delete the new item added previously', () => {
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click();
        itemGroup.deleteItem();
        siteLogPage.save();
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.partyItems, 'deleting an item', noOfItems);
    });
});
