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

    it('expect should be able to modify and save all sites', async () => {
        console.log('Total number of sites found: ' + allSiteIds.length);
        expect(allSiteIds.length).toBeGreaterThan(0);

        let modifyAndSaveSite = async (siteId: string, count: number): Promise<void> => {
            let siteLogPage: SiteLogPage = await selectSitePage.openSiteAsync(siteId);
            await siteLogPage.siteInformationHeader.click();
            await siteLogPage.siteIdentificationHeader.click();
            await TestUtils.appendTimestampAsync(siteLogPage.siteNameInput, timestamp);
            await siteLogPage.saveAsync();
            await siteLogPage.closeAsync(count + '. Modify and save site - ' + siteId + ': done.');
            return Promise.resolve();
        };

        for (let i = 0; i < allSiteIds.length; i ++) {
            await modifyAndSaveSite(allSiteIds[i], i);
        }
    });

    it('expect should have changes saved for all sites', async () => {
        let checkValuesSaved = async (siteId: string, count: number): Promise<void> => {
            let siteLogPage: SiteLogPage = await selectSitePage.openSiteAsync(siteId);
            await siteLogPage.siteInformationHeader.click();
            await siteLogPage.siteIdentificationHeader.click();
            await TestUtils.checkInputValueContainAsync(siteLogPage.siteNameInput, 'Site Name', timestamp);
            await siteLogPage.closeAsync(count + '. Verify changes saved for site - ' + siteId + ': done.');
            return Promise.resolve();
        };

        for (let i = 0; i < allSiteIds.length; i ++) {
            await checkValuesSaved(allSiteIds[i], i);
        }
    });
});
