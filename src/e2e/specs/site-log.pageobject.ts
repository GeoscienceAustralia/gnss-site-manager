import { element, by, ElementFinder } from 'protractor';
import { BasePage } from './base.pageobject';

export class SiteLogPage extends BasePage {
    readonly url_ade1: string = '/siteLog/ADE1';
    readonly siteInformationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    public readonly siteNameInput: ElementFinder = element(by.css('site-identification text-input[formControlName="siteName"] input'));

    public identifyingElement(): ElementFinder {
        return this.siteInformationHeader;
    }
}
