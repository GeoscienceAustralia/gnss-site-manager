import { ElementFinder, element, by } from 'protractor';

/**
 * OpenAM OpenId Auth pages
 */
export class OpenAmLoginPage {
    readonly userNameField: ElementFinder = element(by.id('idToken1'));
    readonly passwordField: ElementFinder = element(by.id('idToken2'));
    readonly loginButton: ElementFinder = element(by.id('loginButton_0'));
}
