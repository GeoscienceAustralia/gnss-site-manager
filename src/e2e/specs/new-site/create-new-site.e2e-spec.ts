import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { GnssReceiverViewModel } from '../../../client/app/gnss-receiver/gnss-receiver-view-model';
import { GnssReceiverGroup } from '../page-objects/gnss-receiver-group.pageobject';
import { GnssAntennaViewModel } from '../../../client/app/gnss-antenna/gnss-antenna-view-model';
import { GnssAntennaGroup } from '../page-objects/gnss-antenna-group.pageobject';
import { mockResponsibleParty, mockGnssReceiver, mockGnssAntenna } from '../site-log-groups/view-model';

describe('New GNSS Site Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let adminUser: string = 'user.x';
    let adminPassword: string = 'gumby123X';
    let siteId: string = 'TEST';
    let siteName: string = 'e2e testing - new sitelog ' + timestamp;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;

    beforeAll(() => {
        console.log('*** Testing of creating a new site:');
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.loginAs(adminUser, adminPassword);
        browser.waitForAngular();
        siteLogPage = selectSitePage.createNewSite();
        browser.waitForAngular();
    });

    afterAll(() => {
        siteLogPage.saveNewSite();
    });

    it('expect should be able to add values to Site Identification', () => {
        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();
        siteLogPage.siteIdInput.sendKeys(siteId);
        siteLogPage.siteNameInput.sendKeys(siteName);
        console.log('Fill out Site Identification form');
    });

    it('expect should be able to add values to Site Metadata Custodian', () => {
        let itemGroup: ResponsiblePartyGroup = siteLogPage.siteMetadataCustodianGroup;
        let viewModel: ResponsiblePartyViewModel = mockResponsibleParty;
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
        });
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
        console.log('Fill out Site Metadata Custodian form');
    });

    it('expect should be able to add values to GNSS Receiver', () => {
        let itemGroup: GnssReceiverGroup = siteLogPage.gnssReceiverGroup;
        let viewModel: GnssReceiverViewModel = mockGnssReceiver;
        itemGroup.addNewItem();
        TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateInstalled');
        itemGroup.receiverTypeInput.sendKeys(viewModel.receiverType);
        itemGroup.serialNumberInput.sendKeys(viewModel.manufacturerSerialNumber);
        itemGroup.firmwareVersionInput.sendKeys(viewModel.firmwareVersion);
        itemGroup.elevationCutoffSettingInput.sendKeys(viewModel.elevationCutoffSetting.toString());
        itemGroup.temperatureStabilizationInput.sendKeys(viewModel.temperatureStabilization.toString());
        itemGroup.notesInput.sendKeys(viewModel.notes);
        console.log('Fill out GNSS Receiver form');
    });

    it('expect should be able to add values to GNSS Antenna', () => {
        let itemGroup: GnssAntennaGroup = siteLogPage.gnssAntennaGroup;
        let viewModel: GnssAntennaViewModel = mockGnssAntenna;
        itemGroup.addNewItem();
        TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateInstalled');
        itemGroup.antennaTypeInput.sendKeys(viewModel.antennaType);
        itemGroup.serialNumberInput.sendKeys(viewModel.serialNumber);
        itemGroup.antennaReferencePointInput.sendKeys(viewModel.antennaReferencePoint);
        itemGroup.markerArpUpEccInput.sendKeys(viewModel.markerArpUpEcc.toString());
        itemGroup.markerArpNorthEccInput.sendKeys(viewModel.markerArpNorthEcc.toString());
        itemGroup.markerArpEastEccInput.sendKeys(viewModel.markerArpEastEcc.toString());
        itemGroup.alignmentFromTrueNorthInput.sendKeys(viewModel.alignmentFromTrueNorth.toString());
        itemGroup.antennaRadomeTypeInput.sendKeys(viewModel.antennaRadomeType);
        itemGroup.radomeSerialNumberInput.sendKeys(viewModel.radomeSerialNumber);
        itemGroup.antennaCableTypeInput.sendKeys(viewModel.antennaCableType);
        itemGroup.antennaCableLengthInput.sendKeys(viewModel.antennaCableLength.toString());
        itemGroup.notesInput.sendKeys(viewModel.notes);
        console.log('Fill out GNSS Antenna form');
    });
});
