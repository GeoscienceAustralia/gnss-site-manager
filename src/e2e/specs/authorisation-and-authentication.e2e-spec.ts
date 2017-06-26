import { browser } from 'protractor';
import { AuthPage } from './auth.pageobject';
import { SelectSitePage } from './select-site.pageobject';
import { SiteLogPage } from './site-log.pageobject';

describe('Authorization/Authentication', () => {

    let authPage: AuthPage = new AuthPage();
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let siteLogPage: SiteLogPage = new SiteLogPage();

    let loadRoot = () => {
        browser.get('/');
    };

    beforeEach(loadRoot);

    it('login menu and link should exist', () => {
        expect(authPage.loginMenu.isPresent()).toBe(true);
        expect(authPage.loginLink.isPresent()).toBe(true);
    });

    it('should not allow edits when a user is not logged in', () => {
        authPage.logOut();
        selectSitePage.searchForClickOnSiteName('ADE1');

        siteLogPage.siteInformaationHeader.click();
        siteLogPage.siteIdentificationHeader.click();

        expect(siteLogPage.siteNameInput.isEnabled()).toBe(false, 'siteNameInput should not be enabled');
    });

    it('should allow edits when a user is logged in', () => {
        authPage.logIn();

        selectSitePage.searchForClickOnSiteName('ADE1');

        siteLogPage.siteInformaationHeader.click();
        siteLogPage.siteIdentificationHeader.click();

        expect(siteLogPage.siteNameInput.isEnabled()).toBe(true, 'siteNameInput should be enabled');
    });
});
