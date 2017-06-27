import { browser } from 'protractor';
import { SelectSitePage } from './select-site.pageobject';
import { SiteLogPage } from './site-log.pageobject';
import { TestUtils } from './test.utils';

describe('SelectSite', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let siteLogPage: SiteLogPage = new SiteLogPage();

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('entering search text should return list of sites - one site', () => {
        selectSitePage.searchFor('ade1');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toEqual(1);
        expect(selectSitePage.selectSiteListItems.first().getText()).toBe('ADE1');
        TestUtils.debug(selectSitePage.selectSiteList);
    });

    it('entering search text but do not click on button should return list of sites - one site', () => {
        selectSitePage.enterSearchText('ade1');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toEqual(1);
        expect(selectSitePage.selectSiteListItems.first().getText()).toBe('ADE1');
        TestUtils.debug(selectSitePage.selectSiteList);
    });

    it('entering search text should return the specific sites - multiple sites', () => {
        selectSitePage.searchFor('ade');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).not.toBe(0);
        expect(TestUtils.elementArrayContaining(selectSitePage.selectSiteListItems, 'ADE1').count()).toBe(1);
        TestUtils.debugArray(selectSitePage.selectSiteListItems);
    });

    it('selecting a specific site from the list should display the siteLog', () => {
        selectSitePage.searchForClickOnSiteName('ADE1');
        expect(siteLogPage.siteInformationHeader.isPresent()).toEqual(true, 'ADE1\'s siteLogPage.siteInformationHeader should exist');
    });

    it('selecting a general site string from the list should display the siteLog', () => {
        selectSitePage.searchFor('ade');
        selectSitePage.clickOnSite('ade1');
        expect(siteLogPage.siteInformationHeader.isPresent()).toEqual(true, 'ADE1\'s siteLogPage.siteInformationHeader should exist');
    });
});
