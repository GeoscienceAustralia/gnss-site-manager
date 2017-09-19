import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { GnssAntennaGroup } from '../page-objects/gnss-antenna-group.pageobject';
import { GnssAntennaViewModel } from '../../../client/app/gnss-antenna/gnss-antenna-view-model';
import { mockGnssAntenna } from '../site-log-groups/view-model';

describe('GNSS Antenna Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let siteId: string = 'ADE1';
    let viewModel: GnssAntennaViewModel = mockGnssAntenna;
    let deleteReason: string = 'e2e testing - delete an item ' + timestamp;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: GnssAntennaGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.gnssAntennaGroup;
    });

    it('expect should be able to add and save new  item', () => {
        expect(siteLogPage.saveSiteLink.isPresent()).toBe(true);
        expect(siteLogPage.saveSiteLink.getAttribute('class')).toContain('disabled', 'Save button is not enabled as no changes made');
        itemGroup.items.count().then((value: number) => {
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before adding new item: ' + value);
            browser.waitForAngular();

            itemGroup.addNewItem();
            TestUtils.checkItemCount(itemGroup.items, 'adding new item', noOfItems + 1);
            TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateInstalled');
            if(noOfItems > 0) {
                TestUtils.checkInputValueNotNull(itemGroup.prevDateRemovedInput, 'previous DateRemoved');
            }

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
            browser.waitForAngular();
            siteLogPage.save();
        });
    });

    it('expect should have all input values for the new  item created previously', () => {
        siteLogPage.reload(siteId);
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + 's group');
            browser.waitForAngular();

            itemGroup.currentItemHeader.click().then(() => {
                console.log('Open the first ' + itemGroup.itemName + ' item');
            });
            browser.waitForAngular();

            TestUtils.checkInputValueEqual(itemGroup.antennaTypeInput, 'AntennaType', viewModel.antennaType);
            TestUtils.checkInputValueEqual(itemGroup.serialNumberInput, 'SerialNumber', viewModel.serialNumber);
            TestUtils.checkInputValueEqual(itemGroup.antennaReferencePointInput,
                                                'AntennaReferencePoint', viewModel.antennaReferencePoint);
            TestUtils.checkInputValueEqual(itemGroup.markerArpUpEccInput, 'MarkerArpUpEcc', viewModel.markerArpUpEcc);
            TestUtils.checkInputValueEqual(itemGroup.markerArpNorthEccInput, 'MarkerArpNorthEcc', viewModel.markerArpNorthEcc);
            TestUtils.checkInputValueEqual(itemGroup.markerArpEastEccInput, 'MarkerArpEastEcc', viewModel.markerArpEastEcc);
            TestUtils.checkInputValueEqual(itemGroup.alignmentFromTrueNorthInput,
                                                'AlignmentFromTrueNorth', viewModel.alignmentFromTrueNorth);
            TestUtils.checkInputValueEqual(itemGroup.antennaRadomeTypeInput,
                                                'AntennaRadomeType', viewModel.antennaRadomeType);
            TestUtils.checkInputValueEqual(itemGroup.radomeSerialNumberInput, 'RadomeSerialNumber', viewModel.radomeSerialNumber);
            TestUtils.checkInputValueEqual(itemGroup.antennaCableTypeInput, 'antennaCableType', viewModel.antennaCableType);
            TestUtils.checkInputValueEqual(itemGroup.antennaCableLengthInput, 'AntennaCableLength', viewModel.antennaCableLength);
            TestUtils.checkInputValueEqual(itemGroup.notesInput, 'Notes', viewModel.notes);
        });
    });

    it('expect should be able to delete a  item', () => {
        siteLogPage.reload(siteId);
        itemGroup.deleteItem(deleteReason);
        siteLogPage.save();
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.items, 'deleting an item', noOfItems);
    });
});
