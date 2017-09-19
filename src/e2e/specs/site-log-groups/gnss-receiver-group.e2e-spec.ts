import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { GnssReceiverGroup } from '../page-objects/gnss-receiver-group.pageobject';
import { GnssReceiverViewModel } from '../../../client/app/gnss-receiver/gnss-receiver-view-model';
import { mockGnssReceiver } from '../site-log-groups/view-model';

describe('GNSS Receiver Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let siteId: string = 'ADE1';
    let viewModel: GnssReceiverViewModel = mockGnssReceiver;
    let deleteReason: string = 'e2e testing - delete an item ' + timestamp;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: GnssReceiverGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.gnssReceiverGroup;
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

            itemGroup.receiverTypeInput.sendKeys(viewModel.receiverType);
            itemGroup.serialNumberInput.sendKeys(viewModel.manufacturerSerialNumber);
            itemGroup.firmwareVersionInput.sendKeys(viewModel.firmwareVersion);
            itemGroup.elevationCutoffSettingInput.sendKeys(viewModel.elevationCutoffSetting.toString());
            itemGroup.temperatureStabilizationInput.sendKeys(viewModel.temperatureStabilization.toString());
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

            TestUtils.checkInputValueEqual(itemGroup.receiverTypeInput, 'ReceiverType', viewModel.receiverType);
            TestUtils.checkInputValueEqual(itemGroup.serialNumberInput, 'SerialNumber', viewModel.manufacturerSerialNumber);
            TestUtils.checkInputValueEqual(itemGroup.firmwareVersionInput, 'FirmwareVersion', viewModel.firmwareVersion);
            TestUtils.checkInputValueEqual(itemGroup.elevationCutoffSettingInput,
                                                        'ElevationCutoffSetting', viewModel.elevationCutoffSetting);
            TestUtils.checkInputValueEqual(itemGroup.temperatureStabilizationInput,
                                                        'TemperatureStabilization', viewModel.temperatureStabilization);
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
