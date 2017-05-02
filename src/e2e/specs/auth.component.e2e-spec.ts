import { browser, element, by } from 'protractor';

xdescribe('Authorization/Authentication', () => {

    beforeEach(async () => {
        return await browser.get('/');
    });

    it('should not allow edits when a user is not logged in', () => {
        let searchText = element(by.name('searchText'));
        searchText.sendKeys('ADE1');

        // find the element of interest in the search results and click it
        element(by.cssContainingText('table tr td', 'ADE1')).click();

        // find the fourCharacterID input field and check if it is editable (it shouldn't be)
        let fourCharacterId = element(by.css('text-input[controlname="fourCharacterID"]'));
        expect(fourCharacterId.isEnabled()).toBe(false);
    });

    // this test logs in using OpenAM, a non-angular page and then returns to our app
    // we could just do all of this in webdriver-land but it's a good example of testing
    // a hybrid angular/non-angular app so I'm using a switching approach
    it('should allow edits when a user is logged in', () => {

        // click the login button
        element(by.buttonText('Login')).click();

        // okay we are now in a non-angular environment
        browser.ignoreSynchronization = true;
        browser.driver.manage().timeouts().implicitlyWait(12000);

        // wait maximum of 20 secs for the login page
        // TODO - check this non-functional requirement as I just made it up
        browser.driver.wait(function() {
            return browser.driver.findElement(by.id('loginButton_0'))
                .then(function(loginButton) {
                    let userNameField = browser.driver.findElement(by.id('idToken1'));
                    userNameField.clear();
                    userNameField.sendKeys('user.a');
                    let passwordField = browser.driver.findElement(by.id('idToken2'));
                    passwordField.clear();
                    passwordField.sendKeys('gumby123A');
                    loginButton.click();
                    return true;
                }
                );
        }, 20000);

        // wait maximum of 20 secs to return to the search page
        // TODO - check this non-functional requirement as I just made it up
        browser.driver.wait(function() {
            return browser.driver.findElement(by.name('searchText'))
                .then(function(loginButton) {
                    return true;
                });
        }, 20000);

        // okay we are back in our app and good old AngularJS
        browser.ignoreSynchronization = false;
        browser.driver.manage().timeouts().implicitlyWait(0);

        let searchText = element(by.name('searchText'));
        searchText.sendKeys('ADE1');

        // find the element of interest in the search results and click it
        element(by.cssContainingText('table tr td', 'ADE1')).click();

        // find the fourCharacterID input field and check if it is editable (it should be)
        let fourCharacterId = element(by.css('text-input[controlname="fourCharacterID"]'));
        expect(fourCharacterId.isEnabled()).toBe(true);
    });
});
