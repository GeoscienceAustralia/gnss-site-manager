import { browser } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

describe('All Site Log Components', () => {

    let originalTimeout: number;
    let siteId: string = 'ADE1';
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('expect should be able to add and save new items', () => {
        console.log('a) Add and save new items for all instruments/devices');
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            siteLogGroup.addNewItem();
        });

        siteLogPage.save();
    });

    it('expect should have all input values for new items saved', () => {
        console.log('b) Verify input values for all new items saved');
        siteLogPage.reload(siteId);
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            siteLogGroup.checkInputValues();
        });
    });

    it('expect should be able to delete all new items saved', () => {
        console.log('c) Delete all new items saved');
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            siteLogGroup.deleteNewItem();
        });

        siteLogPage.save();
        siteLogPage.reload(siteId);

        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            siteLogGroup.checkItemDeleted();
        });
    });
});
