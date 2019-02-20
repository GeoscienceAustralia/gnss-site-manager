import { browser } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';

/**
 * Test of adding/deleting new responsible parties if it is allowed
 * 1) Site Contacts and Site Data Centers are arrays with 0 ~ n items and, therefore, are always allowed to add new items;
 * 2) Site Owner, Site Data Source and Site Metadata Custodian are allowed to add new item only if it is empty.
 */
describe('Site Information Component', () => {

    let siteId: string = 'ADE1';
    let originalTimeout: number;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let responsibleParties: ResponsiblePartyGroup[];

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);

        responsibleParties = [
            new ResponsiblePartyGroup('Site Owner'),
            new ResponsiblePartyGroup('Site Contact'),
            new ResponsiblePartyGroup('Site Metadata Custodian'),
            new ResponsiblePartyGroup('Site Data Center'),
            new ResponsiblePartyGroup('Site Data Source'),
        ];
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('expect should be able to add new items or backup values for existing items', () => {
        console.log('a) Add new items or backup values for existing items');
        siteLogPage.siteInformationHeader.click().then(() => {
            responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
                responsibleParty.addNewItemOrBackupValues();
            });
        });
        siteLogPage.save();
    });

    it('expect should have all input values saved or modified', () => {
        console.log('b) Verify input values saved for new items or modified for existing items');
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click().then(() => {
            responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
                responsibleParty.checkInputOrModifiedValues();
            });
        });
    });

    it('expect should be able to delete new items saved or restore backup values', () => {
        console.log('c) Delete new items saved or restore backup values for existing items');
        responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
            responsibleParty.deleteItemOrRestoreBackupValues();
        });

        siteLogPage.save();
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click().then(() => {
            responsibleParties.map((responsibleParty: ResponsiblePartyGroup) => {
                responsibleParty.checkItemDeletedOrBackupValues();
            });
        });
    });
});
