import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { MeteorologicalSensorGroup } from '../page-objects/meteorological-sensor-group.pageobject';
import { TemperatureSensorViewModel } from '../../../client/app/temperature-sensor/temperature-sensor-view-model';
import { mockTemperatureSensor } from './view-model';

describe('Temperature Sensor Group Component', () => {

    let siteId: string = 'ADE1';
    let viewModel: TemperatureSensorViewModel = mockTemperatureSensor;
    let deleteReason: string = 'e2e testing - delete an item ' + TestUtils.getTimeStamp();;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: MeteorologicalSensorGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.temperatureSensorGroup;
        itemGroup.items.count().then((value: number) => {
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before testing: ' + value);
            browser.waitForAngular();
        });
    });

    it('expect should be able to add and save a new item', () => {
        itemGroup.addNewItem();
        TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateInstalled');
        if(noOfItems > 0) {
            TestUtils.checkInputValueNotNull(itemGroup.prevDateRemovedInput, 'previous DateRemoved');
        }

        itemGroup.manufacturerInput.sendKeys(viewModel.manufacturer);
        itemGroup.typeInput.sendKeys(viewModel.type);
        itemGroup.serialNumberInput.sendKeys(viewModel.serialNumber);
        itemGroup.dataSamplingIntervalInput.sendKeys(viewModel.dataSamplingInterval.toString());
        itemGroup.accuracyDegreesCelciusInput.sendKeys(viewModel.accuracyDegreesCelcius.toString());
        itemGroup.heightDiffToAntennaInput.sendKeys(viewModel.heightDiffToAntenna.toString());
        itemGroup.aspirationInput.sendKeys(viewModel.aspiration);
        itemGroup.calibrationDateInput.sendKeys(viewModel.calibrationDate);
        itemGroup.notesInput.sendKeys(viewModel.notes);
        browser.waitForAngular();
        siteLogPage.save();
    });

    it('expect should have all input values for the new item created previously', () => {
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.items, 'adding new item', noOfItems + 1);
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + 's group');
            browser.waitForAngular();

            itemGroup.currentItemHeader.click().then(() => {
                console.log('Open the first ' + itemGroup.itemName + ' item');
            });
            browser.waitForAngular();

            TestUtils.checkInputValueEqual(itemGroup.manufacturerInput, 'Manufacturer', viewModel.manufacturer);
            TestUtils.checkInputValueEqual(itemGroup.typeInput, 'Type', viewModel.type);
            TestUtils.checkInputValueEqual(itemGroup.serialNumberInput, 'Serial Number', viewModel.serialNumber);
            TestUtils.checkInputValueEqual(itemGroup.dataSamplingIntervalInput, 'Data Sampling Interval', viewModel.dataSamplingInterval);
            TestUtils.checkInputValueEqual(itemGroup.accuracyDegreesCelciusInput,
                                                        'Accuracy HPa', viewModel.accuracyDegreesCelcius);
            TestUtils.checkInputValueEqual(itemGroup.heightDiffToAntennaInput, 'Height Diff To Antenna', viewModel.heightDiffToAntenna);
            TestUtils.checkInputValueEqual(itemGroup.aspirationInput, 'Serial Number', viewModel.aspiration);
            TestUtils.checkInputValueEqual(itemGroup.calibrationDateInput, 'Calibration Date', viewModel.calibrationDate);
            TestUtils.checkInputValueEqual(itemGroup.notesInput, 'Notes', viewModel.notes);
        });
    });

    it('expect should be able to delete an item', () => {
        siteLogPage.reload(siteId);
        itemGroup.deleteItem(deleteReason);
        siteLogPage.save();
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.items, 'deleting an item', noOfItems);
    });
});
