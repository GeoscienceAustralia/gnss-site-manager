import { browser } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { TestUtils } from '../utils/test.utils';

describe('SelectSite', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('clicking on search button without search text should return all sites', () => {
        selectSitePage.searchButton.click();
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toBeGreaterThan(1);
    });

    it('entering partial search text without clicking on button should return multiple sites', () => {
        selectSitePage.enterSearchText('ad');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toBeGreaterThan(1);
        expect(TestUtils.elementArrayContaining(selectSitePage.selectSiteListItems, 'ADE1').count()).toBe(1);
    });

    it('entering a valid site Id as search text without clicking on button should return one site', () => {
        selectSitePage.enterSearchText('ade1');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toEqual(1);
        expect(selectSitePage.selectSiteListItems.first().getText()).toBe('ADE1');
    });

    it('selecting a site from a list should display the site page', () => {
        selectSitePage.searchFor('ade');
        let siteLogPage: SiteLogPage = selectSitePage.clickOnSite('ade1');
        expect(siteLogPage.siteInformationHeader.isPresent()).toEqual(true, 'ADE1\'s siteLogPage.siteInformationHeader should exist');
    });
});
