import { browser, ElementFinder } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';

describe('All GNSS sites', () => {

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

    it('expect should have no fields modified after initial loading', async () => {
        console.log('Total number of sites found: ' + allSiteIds.length);
        expect(allSiteIds.length).toBeGreaterThan(0);

        let siteLogPage: SiteLogPage = new SiteLogPage();
        let dirtySiteCount: number = 0;
        let checkInitialModifyStatus = async (siteId: string) => {
            await browser.get('/siteLog/' + siteId);
            browser.waitForAngular();
            await siteLogPage.levelOneDirtyHeaders.then(async (dirtyGroups) => {
                if (dirtyGroups.length > 0) {
                    dirtySiteCount += 1;
                    console.log(dirtySiteCount + '. ' + siteId + ' is initially dirty (modified)');
                }

                for (let dirtyGroup of dirtyGroups) {
                    let dirtyGroupHeader: ElementFinder = siteLogPage.getGroupHeader(dirtyGroup);
                    await dirtyGroupHeader.click();
                    let groupName: string = await dirtyGroupHeader.getText();
                    console.log('  Modified group: ', groupName);
                    await siteLogPage.getDirtyItems(groupName).then(async (dirtyItems) => {
                        for (let dirtyItem of dirtyItems) {
                            let dirtyItemHeader: ElementFinder = siteLogPage.getItemHeader(dirtyItem);
                            await dirtyItemHeader.click();
                            let itemName: string = await dirtyItemHeader.getText();
                            console.log('    Modified item: ', itemName);
                            await siteLogPage.getDirtyFields(dirtyItem).then(async (dirtyFields) =>  {
                                for (let dirtyField of dirtyFields) {
                                    if (await siteLogPage.getDirtyFieldInput(dirtyField).isPresent()) {
                                        let fieldName: string = await siteLogPage.getDirtyFieldLabel(dirtyField).getText();
                                        console.log('      Modified field: ', fieldName);
                                    }
                                }
                            });
                        }
                    });
                }
                expect(dirtyGroups.length).toBe(0);
                await siteLogPage.closeAfterConfirmationAsync();
            });
        };

        for (let i = 0; i < allSiteIds.length; i ++) {
            await checkInitialModifyStatus(allSiteIds[i]);
        }
    });
});
