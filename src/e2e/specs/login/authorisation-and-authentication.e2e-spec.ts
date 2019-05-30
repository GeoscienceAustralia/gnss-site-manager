import { browser } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LoginActions } from '../utils/login.actions';

describe('Authorization/Authentication', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions  = new LoginActions(selectSitePage);

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('should allow edits when a user is logged in with right roles', () => {
        loginActions.login('user.a', 'gumby123A');
        let siteLogPage: SiteLogPage = selectSitePage.openSite('ADE1');
        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();
        expect(siteLogPage.siteNameInput.isEnabled()).toBe(true, 'siteNameInput should be enabled');
    });

    it('should be able to login as a different user with different authorization', () => {
        loginActions.loginAs('user.a', 'gumby123A');
        let siteLogPage: SiteLogPage = selectSitePage.openSite('ADE2');
        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();
        expect(siteLogPage.siteNameInput.isEnabled()).toBe(false, 'SiteName Input should not be enabled');
        siteLogPage.close();

        browser.waitForAngular();
        loginActions.loginAs('user.b', 'gumby123B');
        siteLogPage = selectSitePage.openSite('ADE2');
        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();
        expect(siteLogPage.siteNameInput.isEnabled()).toBe(true, 'SiteName Input should be enabled');
        siteLogPage.close();
    });

    it('should not allow edits when a user is not logged in', () => {
        loginActions.logout();
        let siteLogPage: SiteLogPage = selectSitePage.openSite('ADE1');
        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();
        expect(siteLogPage.siteNameInput.isEnabled()).toBe(false, 'siteNameInput should not be enabled');
    });
});
