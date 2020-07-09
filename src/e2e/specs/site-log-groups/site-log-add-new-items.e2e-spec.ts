import { browser } from 'protractor';
import { ElementFinder } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';
import { siteLogTestData } from './test-data';

describe('All Site Log Components', () => {
    let originalTimeout: number;
    let siteId: string = 'ADE1';
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let timestamp: string;
    let deleteReason: string;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

        timestamp = TestUtils.getTimeStamp();
        deleteReason = 'e2e testing - delete an item ' + timestamp;

        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSiteLogPage(siteId);
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        loginActions.logout();
    });

    it('expect should be able to add and save new items', () => {
        console.log('a) Add and save new items for all instrument groups');
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            let testData = siteLogTestData[siteLogGroup.controlName];
            siteLogGroup.items.count().then((value: number) => {
                siteLogGroup.noOfItems = value;
                console.log('\tNumber of ' + siteLogGroup.itemName
                            + ' items before adding new item: ' + value);

                siteLogGroup.addNewItemButton.click().then(() => {
                    console.log('\tAdd a new ' + siteLogGroup.itemName + ' item');
                    siteLogGroup.getAllInputFields().map((inputField: ElementFinder) => {
                        TestUtils.changeInputValue(inputField, testData);
                    });
                });
            });
        });

        siteLogPage.save();
    });

    it('expect should have all input values for new items saved', () => {
        console.log('b) Verify input values for all new items saved');
        siteLogPage.reload(siteId);
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            let testData = siteLogTestData[siteLogGroup.controlName];
            TestUtils.checkItemCount(siteLogGroup.items, 'adding a new '
                                    + siteLogGroup.itemName
                                    + ' item', siteLogGroup.noOfItems + 1);
            siteLogGroup.groupHeader.click().then(() => {
                console.log('\tOpen ' + siteLogGroup.itemName + ' group to check input values saved');
                siteLogGroup.getNewItemHeader().click().then(() => {
                    siteLogGroup.getAllInputFields().map((inputField: ElementFinder) => {
                        TestUtils.checkInputValueEqual(inputField, testData);
                    });

                    TestUtils.checkInputValueNotNull(siteLogGroup.getNewItemStartDateInput(), 'current StartDate');
                    if(siteLogGroup.noOfItems > 0 && siteLogGroup.hasEndDateInput) {
                        TestUtils.checkInputValueNotNull(siteLogGroup.getSecondItemEndDateInput(), 'previous EndDate');
                    }
                });
            });
        });
    });

    it('expect should be able to delete all new items saved', () => {
        console.log('c) Delete all new items saved');
        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            siteLogGroup.getDeleteButton().click().then(() => {
                console.log('\tOpen ' + siteLogGroup.getGroupName() + ' group to delete the new item saved');
                siteLogGroup.deleteReasonInput.sendKeys(deleteReason);
                siteLogGroup.confirmDeleteButton.click().then(() => {
                    console.log('\t\tDeleted ' + TestUtils.getOrdinalNumber(siteLogGroup.newItemIndex + 1) + ' '
                                + siteLogGroup.itemName + ' item for the reason: ' + deleteReason);
                });
            });
        });

        siteLogPage.save();
        siteLogPage.reload(siteId);

        siteLogPage.siteLogGroups.map((siteLogGroup: LogItemGroup) => {
            TestUtils.checkItemCount(siteLogGroup.items,
                                     'deleting a ' + siteLogGroup.itemName + ' item',
                                     siteLogGroup.noOfItems);
        });
    });
});
