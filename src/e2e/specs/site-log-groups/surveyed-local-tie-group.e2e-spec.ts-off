import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { SurveyedLocalTieGroup } from '../page-objects/surveyed-local-tie-group.pageobject';

describe('Surveyed Local Tie Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let siteId: string = 'ADE1';
    let tiedMarkerName: string = 'UNK-Test';
    let tiedMarkerUsage: string = 'FOOTPRINT';
    let tiedMarkerCDPNumber: string = 'A14';
    let tiedMarkerDOMESNumber: string = 'A19';
    let dx: string = '2';
    let dy: string = '3';
    let dz: string = '4';
    let localSiteTiesAccuracy: string = '0';
    let surveyMethod: string = 'TRIANGULATION';
    let notes: string = 'e2e testing - add a new item ' + timestamp;
    let deleteReason: string = 'e2e testing - delete an item ' + timestamp;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: SurveyedLocalTieGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.surveyedLocalTieGroup;
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
            TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateMeasured');

            itemGroup.tiedMarkerNameInput.sendKeys(tiedMarkerName);
            itemGroup.tiedMarkerUsageInput.sendKeys(tiedMarkerUsage);
            itemGroup.tiedMarkerCDPNumberInput.sendKeys(tiedMarkerCDPNumber);
            itemGroup.tiedMarkerDOMESNumberInput.sendKeys(tiedMarkerDOMESNumber);
            itemGroup.dxInput.sendKeys(dx);
            itemGroup.dyInput.sendKeys(dy);
            itemGroup.dzInput.sendKeys(dz);
            itemGroup.localSiteTiesAccuracyInput.sendKeys(localSiteTiesAccuracy);
            itemGroup.surveyMethodInput.sendKeys(surveyMethod);
            itemGroup.notesInput.sendKeys(notes);
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

            TestUtils.checkInputValueEqual(itemGroup.tiedMarkerNameInput, 'Tied Marker Name', tiedMarkerName);
            TestUtils.checkInputValueEqual(itemGroup.tiedMarkerUsageInput, 'Tied Marker Usage', tiedMarkerUsage);
            TestUtils.checkInputValueEqual(itemGroup.tiedMarkerCDPNumberInput, 'Tied Marker CDP Number', tiedMarkerCDPNumber);
            TestUtils.checkInputValueEqual(itemGroup.tiedMarkerDOMESNumberInput, 'Tied Marker DOMES Number', tiedMarkerDOMESNumber);
            TestUtils.checkInputValueEqual(itemGroup.dxInput, 'dx', dx);
            TestUtils.checkInputValueEqual(itemGroup.dyInput, 'dy', dy);
            TestUtils.checkInputValueEqual(itemGroup.dzInput, 'dz', dz);
            TestUtils.checkInputValueEqual(itemGroup.localSiteTiesAccuracyInput, 'Local Site Ties Accuracy', localSiteTiesAccuracy);
            TestUtils.checkInputValueEqual(itemGroup.surveyMethodInput, 'Survey Method', surveyMethod);
            TestUtils.checkInputValueEqual(itemGroup.notesInput, 'Notes', notes);
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
