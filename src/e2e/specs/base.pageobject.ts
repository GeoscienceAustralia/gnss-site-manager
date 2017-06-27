import { ElementFinder, element, by } from 'protractor';

export abstract class BasePage {
    readonly loginMenu: ElementFinder = element(by.css('nav.profile-menu'));
    readonly loginLink: ElementFinder = element(by.cssContainingText('a', 'Login'));
    readonly logoutLink: ElementFinder = element(by.cssContainingText('a', 'Logout'));

    /**
     * Subclasses should return an element on the page that is always present regardless of state.  It is used to know if are on that page.
     */
    public abstract identifyingElement(): ElementFinder;
}
