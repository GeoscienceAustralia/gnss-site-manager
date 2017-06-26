import { element, by, ElementFinder } from 'protractor';
import { BasePage } from './base.pageobject';

export class SiteLogPage extends BasePage {
    readonly url_ade1: string = '/siteLog/ADE1';
    readonly siteInformaationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    // let siteNameElement = element(by.xpath('//text-input[@controlname="siteName"]//input'));
    public readonly siteNameInput: ElementFinder = element(by.css('site-identification text-input[formControlName="siteName"] input'));

}
