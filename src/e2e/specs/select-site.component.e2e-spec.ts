import { browser } from 'protractor';
import { SelectSitePage } from './select-site.pageobject';

describe('SelectSite', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('entering search text should return list of sites - one site', () => {
        selectSitePage.searchFor('ade1');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toEqual(1);
        expect(selectSitePage.selectSiteListItems.first().getText()).toBe('ADE1');
        selectSitePage.debug(selectSitePage.selectSiteList);
    });

    it('entering search text but do not click on button should return list of sites - one site', () => {
        selectSitePage.enterSearchText('ade1');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toEqual(1);
        expect(selectSitePage.selectSiteListItems.first().getText()).toBe('ADE1');
        selectSitePage.debug(selectSitePage.selectSiteList);
    });

    it('entering search text should return the specific sites - multiple sites', () => {
        selectSitePage.searchFor('ade');
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteListItems.count()).toBeGreaterThan(1);
        expect(selectSitePage.elementArrayContaining(selectSitePage.selectSiteListItems, 'ADE1').count()).toBe(1);
        selectSitePage.debugArray(selectSitePage.elementArrayContaining(selectSitePage.selectSiteListItems, 'ADE1'));
    });
});
