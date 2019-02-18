import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';

describe('All GNSS sites', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let adminUser: string = 'user.x';
    let adminPassword: string = 'gumby123X';
    let allSiteIds: string[] = [];

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        loginActions.logout();
    });

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('expect should have a list of sites available', () => {
        loginActions.loginAs(adminUser, adminPassword);
        browser.waitForAngular();

        selectSitePage.searchAll();
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        selectSitePage.selectSiteListItems.then((allSiteRows) => {
            allSiteRows.forEach((siteRow) => {
                 siteRow.getText().then((siteId: string) => {
                    allSiteIds.push(siteId);
                });
            });
        });
    });

    it('expect should be able to modify and save all sites', () => {
        console.log('Total number of sites found: ' + allSiteIds.length);
        expect(allSiteIds.length).toBeGreaterThan(0);

        let count: number = 0;
        allSiteIds.forEach((siteId: string) => {
            browser.waitForAngular();
            let siteLogPage: SiteLogPage = selectSitePage.openSite(siteId);
            browser.waitForAngular();

            count += 1;
            siteLogPage.siteInformationHeader.click();
            siteLogPage.siteIdentificationHeader.click();
            TestUtils.appendTimestamp(siteLogPage.siteNameInput, timestamp);
            browser.waitForAngular();
            siteLogPage.save();
            siteLogPage.close(count + '. Modify and save site - ' + siteId + ': done.');
        });
    });

    it('expect should have changes saved for all sites', () => {
        let count: number = 0;
        allSiteIds.forEach((siteId: string) => {
            count += 1;
            browser.waitForAngular();
            let siteLogPage: SiteLogPage = selectSitePage.openSite(siteId);
            browser.waitForAngular();

            siteLogPage.siteInformationHeader.click();
            siteLogPage.siteIdentificationHeader.click();
            browser.waitForAngular();
            TestUtils.checkInputValueContain(siteLogPage.siteNameInput, 'Site Name', timestamp);
            siteLogPage.close(count + '. Verify changes saved for site - ' + siteId + ': done.');
        });
    });
});
