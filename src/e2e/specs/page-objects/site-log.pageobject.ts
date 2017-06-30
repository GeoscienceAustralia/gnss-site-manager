import { element, by, ElementFinder, ElementArrayFinder, $, $$ } from 'protractor';
import { BasePage } from '../page-objects/base.pageobject';

export class SiteLogPage extends BasePage {
    readonly urlAde1: string = '/siteLog/ADE1';
    readonly siteInformationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    readonly siteGroupHeaders: ElementArrayFinder = $$('div.group-header:not([hidden])>span.panel-title');
    readonly siteItemHeaders: ElementArrayFinder = $$('div.group-body:not([hidden]) div.item-header>span.panel-title');
    // Find parent groups.  From there (for each) one can open into header (to click) and body (to inspect)
    readonly siteItems: ElementArrayFinder = $$('div.group-body:not([hidden]) div.panel-level-2');
    public readonly siteNameInput: ElementFinder = $('site-identification text-input[formControlName="siteName"] input');

    public identifyingElement(): ElementFinder {
        return this.siteInformationHeader;
    }
}
