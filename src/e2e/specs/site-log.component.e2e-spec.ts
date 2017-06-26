import { browser } from 'protractor';
import { SiteLogPage } from './site-log.pageobject';

describe('SiteLog', () => {
    // no need yet as only the PageObject is needed and used by other e2e test
    let siteLogPage: SiteLogPage = new SiteLogPage();

    beforeEach(async () => {
        return await browser.get(siteLogPage.url_ade1);
    });

    it('expect ade1 sitelog to exist', () => {
        expect(siteLogPage.siteInformaationHeader.isPresent()).toBeTruthy('expect ade1 sitelog\'s SiteIdentification Header to exist');
    });
});
