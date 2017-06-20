import { element, by, ElementFinder, browser, ExpectedConditions, ProtractorExpectedConditions, protractor } from 'protractor';
import { BasePage } from './base.pageobject';
import { SelectSitePage } from './select-site.pageobject';

export class AuthPage extends BasePage {
    readonly url: string = '/';

    readonly loginMenu: ElementFinder = element(by.css('nav.profile-menu'));
    readonly loginLink: ElementFinder = element(by.cssContainingText('a', 'Login'));
    readonly logoutLink: ElementFinder = element(by.cssContainingText('a', 'Logout'));

    // On OpenAM login page
    readonly userNameField: ElementFinder = element(by.id('idToken1'));
    readonly passwordField: ElementFinder = element(by.id('idToken2'));
    readonly loginButton: ElementFinder = element(by.id('loginButton_0'));
    readonly aintExist: ElementFinder = element(by.id('loginButton_666'));

    private selectSitePage: SelectSitePage = new SelectSitePage();
    // ----

    /**
     * Log in if are not already
     */
    public logIn() {
        console.log('Is the login link present ...');
        this.loginMenu.click();
        this.loginLink.isPresent().then((isPresent: boolean) => {
            if (isPresent) {
                console.log('Login link is present');
                this.loginLink.click().then(() => {
                    console.log('Login link clicked');
                });

                this.disableWaitingForAngular();
                var EC = protractor.ExpectedConditions;
                let loginButtonExpected = EC.presenceOf(this.loginButton);
                console.log('Wait for login button ...');
                browser.driver.wait(loginButtonExpected, 2000000).then(() => {
                    console.log('login button present');
                });
                this.userNameField.clear();
                this.userNameField.sendKeys('user.a');
                this.passwordField.clear();
                this.passwordField.sendKeys('gumby123A');
                this.loginButton.click().then(() => {
                    console.log('Login button clicked');
                    console.log('Wait for searchBox ...');
                });
                let searchBoxExpected = EC.presenceOf(this.selectSitePage.searchBox);
                browser.driver.wait(searchBoxExpected(), 20000).then(() => {
                    console.log('SearchBox present');
                });
                this.enableWaitingForAngular();
            } else {
                console.log('AuthPage / logIn - already logged in');
            }
        });
    }

    /**
     * Log out if are not already
     */
    public logOut() {
        console.log('Is the logout link present ...');
        this.logoutLink.isPresent().then((isPresent: boolean) => {
            if (isPresent) {
                console.log('Logout link is present');
                this.logoutLink.click();
                this.disableWaitingForAngular();

                var EC = protractor.ExpectedConditions;
                let searchBoxExpected = EC.presenceOf(this.selectSitePage.searchBox);
                browser.driver.wait(searchBoxExpected(), 20000).then(() => {
                    console.log('SearchBox present');
                });
                this.enableWaitingForAngular();
            } else {
                console.log('AuthPage / logout - already logged out');
            }
        });
    }

    /**
     * Call this function when going from an angular page to a non-angular page
     * to instruct protractor to stop waiting for anuglar zone tasks to complete.
     */
    private disableWaitingForAngular(): void {
        browser.ignoreSynchronization = true;
        browser.driver.manage().timeouts().implicitlyWait(12000);
    }

    /**
     * Call this function when re-entering an angular page to instruct protractor to
     * wait for angular zone tasks to complete, which is protractor's default behaviour.
     */
    private enableWaitingForAngular(): void {
        browser.ignoreSynchronization = false;
        browser.driver.manage().timeouts().implicitlyWait(0);
    }
}
