import { browser } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';

describe('Header', () => {

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('should have the correct menus when logged out', () => {
        loginActions.logout();
        expect(selectSitePage.loginMenu.isPresent()).toEqual(true);
        selectSitePage.loginMenu.click();
        expect(selectSitePage.loginLink.isPresent()).toEqual(true);
        expect(selectSitePage.registerLink.isPresent()).toEqual(true);

        expect(selectSitePage.navigationMenu.isPresent()).toEqual(true);
        selectSitePage.navigationMenu.click();
        expect(selectSitePage.selectSiteLink.isPresent()).toEqual(true);
        expect(selectSitePage.newSiteLink.isPresent()).toEqual(true);
        expect(selectSitePage.newSiteLink.getAttribute('class')).toContain('disabled', 'New Site Link should be disabled');
        expect(selectSitePage.aboutLink.isPresent()).toEqual(true);
    });

    it('should have the correct menus when logged out and viewing a site', () => {
        loginActions.logout();

        let siteLogPage: SiteLogPage = selectSitePage.openSiteLogPage('ADE1');

        expect(siteLogPage.siteIdMenu.isPresent()).toEqual(true);
        siteLogPage.siteIdMenu.click();
        expect(siteLogPage.saveSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.saveSiteLink.getAttribute('class')).toContain('disabled', 'Save link should be disabled');
        expect(siteLogPage.revertSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.closeSiteLink.isPresent()).toEqual(true);

        expect(siteLogPage.loginMenu.isPresent()).toEqual(true);
        siteLogPage.loginMenu.click();
        expect(siteLogPage.loginLink.isPresent()).toEqual(true);
        expect(siteLogPage.registerLink.isPresent()).toEqual(true);

        expect(siteLogPage.navigationMenu.isPresent()).toEqual(true);
        siteLogPage.navigationMenu.click();
        expect(siteLogPage.selectSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.getAttribute('class')).toContain('disabled', 'New Site Link should be disabled');
        expect(siteLogPage.aboutLink.isPresent()).toEqual(true);
    });

    it('should have the correct menus when logged in and viewing a site', () => {
        loginActions.login('user.a', 'gumby123A');

        let siteLogPage: SiteLogPage = selectSitePage.openSiteLogPage('ADE1');

        expect(siteLogPage.siteIdMenu.isPresent()).toEqual(true);
        siteLogPage.siteIdMenu.click();
        expect(siteLogPage.saveSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.revertSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.closeSiteLink.isPresent()).toEqual(true);

        expect(siteLogPage.loginMenu.isPresent()).toEqual(true);
        siteLogPage.loginMenu.click();
        expect(siteLogPage.profileLink.isPresent()).toEqual(true);
        expect(siteLogPage.changePasswordLink.isPresent()).toEqual(true);
        expect(siteLogPage.logoutLink.isPresent()).toEqual(true);

        expect(siteLogPage.navigationMenu.isPresent()).toEqual(true);
        siteLogPage.navigationMenu.click();
        expect(siteLogPage.selectSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.getAttribute('class')).not.toContain('disabled', 'New Site Link should be enabled');
        expect(siteLogPage.aboutLink.isPresent()).toEqual(true);
    });
});
