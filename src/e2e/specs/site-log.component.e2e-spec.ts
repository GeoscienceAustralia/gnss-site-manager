import { browser } from 'protractor';
import { SiteLogPage } from './site-log.pageobject';

describe('SiteLog', () => {
    let siteLogPage: SiteLogPage = new SiteLogPage();

    beforeEach(async () => {
        return await browser.get(siteLogPage.url_ade1);
    });

    it('expect ade1 sitelog to exist', () => {
        expect(siteLogPage.siteInformationHeader.isPresent()).toBeTruthy('expect ade1 sitelog\'s SiteIdentification Header to exist');
    });
});
