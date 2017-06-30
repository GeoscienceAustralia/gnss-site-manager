import { browser } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LoginActions } from '../utils/login.actions';

xdescribe('Authorization/Authentication', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let siteLogPage: SiteLogPage = new SiteLogPage();
    let loginActions: LoginActions  = new LoginActions(selectSitePage);

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('should not allow edits when a user is not logged in', () => {
        loginActions.logout();
        selectSitePage.openSite('ADE1');
        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();
        expect(siteLogPage.siteNameInput.isEnabled()).toBe(false, 'siteNameInput should not be enabled');
    });
});
