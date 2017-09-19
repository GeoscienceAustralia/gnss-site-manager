import { element, by, ElementFinder, ElementArrayFinder, browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { BasePage } from './base.pageobject';
import { SiteLogPage } from './site-log.pageobject';

export class SelectSitePage extends BasePage {
    readonly url: string = '/';
    readonly selectSiteList: ElementFinder = element(by.id('select-site-sites-table'));
    readonly selectSiteListItems: ElementArrayFinder = element.all(by.css('td[name="siteId"'));
    public readonly searchBox: ElementFinder = element(by.css('sd-select-site input[name="searchText"]'));
    public readonly searchButton: ElementFinder = element(by.cssContainingText('button', 'Search'));

    public identifyingElement(): ElementFinder {
        return this.searchBox;
    }

    public enterSearchText(text: string) {
        this.searchBox.sendKeys(text);
        browser.waitForAngular();
    }

    public async enterSearchTextAsync(text: string) {
        await this.searchBox.sendKeys(text);
    }

    public searchFor(siteName: string) {
        this.enterSearchText(siteName);
        this.searchButton.click();
        browser.waitForAngular();
    }

    public searchAll() {
        this.searchButton.click();
        browser.waitForAngular();
    }

    /**
     * Click on the site name in the list.  Run this after searchFor(siteName) - @see searchForSiteNameClick();
     * @param siteName
     */
    public clickOnSite(siteName: string): SiteLogPage {
        expect(TestUtils.elementArrayContaining(this.selectSiteListItems, siteName).count()).toBe(1);
        this.selectSiteListItems.get(0).click();
        browser.waitForAngular();
        return new SiteLogPage();
    }

    public async clickOnSiteAsync(siteName: string): Promise<SiteLogPage> {
        browser.waitForAngular();
        expect(TestUtils.elementArrayContaining(this.selectSiteListItems, siteName).count()).toBe(1);
        browser.waitForAngular();
        await this.selectSiteListItems.first().click();
        return Promise.resolve(new SiteLogPage());
    }

    /**
     * Enter a site Id for quick search and click on the selected site to open its site log page
     *
     * @param siteId - the Id of a site log
     * @return the page object of the site log with given siteId
     */
    public openSite(siteId: string): SiteLogPage {
        this.enterSearchText(siteId);
        return this.clickOnSite(siteId);
    }

    public async openSiteAsync(siteId: string): Promise<SiteLogPage> {
        await this.enterSearchTextAsync(siteId);
        let page: SiteLogPage = await this.clickOnSiteAsync(siteId);
        return Promise.resolve(page);
    }

    /**
     * Create a new site log with all fields empty
     *
     * @return the page object of the new site log
     */
    public createNewSite(): SiteLogPage {
        console.log('Create a new site log ...');
        this.navigationMenu.click();
        this.newSiteLink.click();
        browser.waitForAngular();
        return new SiteLogPage();
    }
}
