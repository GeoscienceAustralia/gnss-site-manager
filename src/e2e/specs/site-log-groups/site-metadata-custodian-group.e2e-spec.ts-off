import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { mockResponsibleParty } from './view-model';

/**
 * The test is based on the requirements (1 mandatory Site Metadata Custodians):
 * 1) Change inputs with new values provided, and then change back to their original values
 */
describe('Responsible Party - Site Metadata Custodian Group Component', () => {

    let viewModel: ResponsiblePartyViewModel = mockResponsibleParty;
    let backupModel: any = {};
    let siteId: string = 'ADE1';

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
        itemGroup = siteLogPage.siteMetadataCustodianGroup;
        browser.waitForAngular();
    });

    it('expect should have only one item', () => {
        itemGroup.partyItems.count().then((value: number) => {
            console.log('Number of ' + itemGroup.itemName + ' items: ' + value);
            expect(value).toBe(1);
        });
    });

    it('expect should have all values changed for the item', () => {
        siteLogPage.siteInformationHeader.click().then(() => {
            console.log('Open Site Information Header');
        });
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
        });

        TestUtils.changeInputValue(itemGroup.individualNameInput, 'individualName', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.organisationNameInput, 'organisationName', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.positionNameInput, 'positionName', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.deliveryPointInput, 'deliveryPoint', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.cityInput, 'city', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.administrativeAreaInput, 'administrativeArea', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.postalCodeInput, 'postalCode', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.countryInput, 'country', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.emailInput, 'email', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.primaryPhoneInput, 'primaryPhone', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.secondaryPhoneInput, 'secondaryPhone', viewModel, backupModel);
        TestUtils.changeInputValue(itemGroup.faxInput, 'fax', viewModel, backupModel);

        siteLogPage.save();
        browser.waitForAngular();
    });

    it('expect should have all new values saved for the item', () => {
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
            console.log('All inputs have been changed to new values successfully.');
        });
    });

    it('expect should have all values changed back to original ones for the first item', () => {
        TestUtils.changeInputValue(itemGroup.individualNameInput, 'individualName', backupModel);
        TestUtils.changeInputValue(itemGroup.organisationNameInput, 'organisationName', backupModel);
        TestUtils.changeInputValue(itemGroup.positionNameInput, 'positionName', backupModel);
        TestUtils.changeInputValue(itemGroup.deliveryPointInput, 'deliveryPoint', backupModel);
        TestUtils.changeInputValue(itemGroup.cityInput, 'city', backupModel);
        TestUtils.changeInputValue(itemGroup.administrativeAreaInput, 'administrativeArea', backupModel);
        TestUtils.changeInputValue(itemGroup.postalCodeInput, 'postalCode', backupModel);
        TestUtils.changeInputValue(itemGroup.countryInput, 'country', backupModel);
        TestUtils.changeInputValue(itemGroup.emailInput, 'email', backupModel);
        TestUtils.changeInputValue(itemGroup.primaryPhoneInput, 'primaryPhone', backupModel);
        TestUtils.changeInputValue(itemGroup.secondaryPhoneInput, 'secondaryPhone', backupModel);
        TestUtils.changeInputValue(itemGroup.faxInput, 'fax', backupModel);

        siteLogPage.save();
        browser.waitForAngular();
        console.log('Changed all values back to original ones for the ' + itemGroup.itemName + ' item');
    });

    it('expect should have all original values saved for the item', () => {
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click();
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
            browser.waitForAngular();
            TestUtils.checkInputValueEqual(itemGroup.individualNameInput, 'Individual Name', backupModel.individualName);
            TestUtils.checkInputValueEqual(itemGroup.organisationNameInput, 'Organisation Name', backupModel.organisationName);
            TestUtils.checkInputValueEqual(itemGroup.positionNameInput, 'Position Name', backupModel.positionName);
            TestUtils.checkInputValueEqual(itemGroup.deliveryPointInput, 'Address', backupModel.deliveryPoint);
            TestUtils.checkInputValueEqual(itemGroup.cityInput, 'City', backupModel.city);
            TestUtils.checkInputValueEqual(itemGroup.administrativeAreaInput, 'State / Province', backupModel.administrativeArea);
            TestUtils.checkInputValueEqual(itemGroup.postalCodeInput, 'Postal Code', backupModel.postalCode);
            TestUtils.checkInputValueEqual(itemGroup.countryInput, 'Country', backupModel.country);
            TestUtils.checkInputValueEqual(itemGroup.emailInput, 'Email', backupModel.email);
            TestUtils.checkInputValueEqual(itemGroup.primaryPhoneInput, 'Primary Phone Number', backupModel.primaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.secondaryPhoneInput, 'Secondary Phone Number', backupModel.secondaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.faxInput, 'Fax Number', backupModel.fax);
            console.log('All inputs have been changed back to their original values successfully.');
        });
    });
});
