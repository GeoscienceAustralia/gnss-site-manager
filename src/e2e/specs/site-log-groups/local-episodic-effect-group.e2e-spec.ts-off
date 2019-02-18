import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LocalEpisodicEffectGroup } from '../page-objects/local-episodic-effect-group.pageobject';

describe('Local Episodic Effect Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let siteId: string = 'ADE1';
    let event: string = 'e2e testing' + timestamp;
    let deleteReason: string = 'e2e testing - delete an item ' + timestamp;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: LocalEpisodicEffectGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.localEpisodicEffectGroup;
        itemGroup.items.count().then((value: number) => {
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before adding new item: ' + value);
        });    });

    it('expect should be able to add and save a new item', () => {
            browser.waitForAngular();
            itemGroup.addNewItem();
            TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateInstalled');
            if(noOfItems > 0) {
                TestUtils.checkInputValueNotNull(itemGroup.prevDateRemovedInput, 'previous DateRemoved');
            }

            itemGroup.eventInput.sendKeys(event);
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

            TestUtils.checkInputValueEqual(itemGroup.eventInput, 'Event', event);
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
