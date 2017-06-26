import { element, by, ElementFinder, ElementArrayFinder, browser } from 'protractor';
import { BasePage } from './base.pageobject';

export class SelectSitePage extends BasePage {
    readonly url: string = '/';
    readonly selectSiteList: ElementFinder = element(by.id('select-site-sites-table'));
    readonly selectSiteListItems: ElementArrayFinder = element.all(by.css('td[name="siteId"'));
    private readonly searchBox: ElementFinder = element(by.css('sd-select-site input[name="searchText"]'));
    private readonly searchButton: ElementFinder = element(by.css('sd-select-site button'));

    public enterSearchText(text: string) {
        this.searchBox.sendKeys(text);
        browser.waitForAngular();
    }

    public searchFor(text: string) {
        this.enterSearchText(text);
        this.searchButton.click();
    }

    public identifyingElement(): ElementFinder {
        return this.searchBox;
    }
}
