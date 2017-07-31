import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './base.pageobject';
import { ResponsiblePartyGroup } from './responsible-party-group.pageobject';
import { GnssReceiverGroup } from './gnss-receiver-group.pageobject';
import { GnssAntennaGroup } from './gnss-antenna-group.pageobject';
import { SurveyedLocalTieGroup } from './surveyed-local-tie-group.pageobject';
import { FrequencyStandardGroup } from './frequency-standard-group.pageobject';

export class SiteLogPage extends BasePage {
    readonly siteInformationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    readonly siteGroupHeaders: ElementArrayFinder = element.all(by.css('div.group-header:not([hidden])>span.panel-title'));
    readonly siteItemHeaders: ElementArrayFinder = element.all(by.css('div.group-body:not([hidden]) div.item-header>span.panel-title'));
    readonly siteNameInput: ElementFinder = element(by.css('site-identification text-input[controlName="siteName"] input'));
    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));

    readonly siteOwnerGroup = new ResponsiblePartyGroup('Site Owner');
    readonly siteContactGroup = new ResponsiblePartyGroup('Site Contact');
    readonly siteMetadataCustodianGroup = new ResponsiblePartyGroup('Site Metadata Custodian');
    readonly siteDataCenterGroup = new ResponsiblePartyGroup('Site Data Center');
    readonly siteDataSourceGroup = new ResponsiblePartyGroup('Site Data Source');
    readonly gnssReceiverGroup = new GnssReceiverGroup();
    readonly gnssAntennaGroup = new GnssAntennaGroup();
    readonly surveyedLocalTieGroup = new SurveyedLocalTieGroup();
    readonly frequencyStandardGroup = new FrequencyStandardGroup();

    public identifyingElement(): ElementFinder {
        return this.siteInformationHeader;
    }

    public save() {
        this.siteIdMenu.click();
        this.saveSiteLink.click();
        this.confirmYesButton.click().then(() => {
            console.log('Clicked "Yes" button to confirm saving all changes made.');
        });
        browser.waitForAngular();
    }

    public revert() {
        this.siteIdMenu.click();
        this.revertSiteLink.click();
        this.confirmYesButton.click().then(() => {
            console.log('Clicked "Yes" button to confirm reverting the site log page');
        });
    }

    /*
     * Reload the site log page with given siteId
     *
     * Note: window.location.reload() won't work here
     */
    public reload(siteId: string) {
        browser.get('/siteLog/' + siteId);
        console.log('Loaded ' + siteId + ' site log page.');
        browser.waitForAngular();
    }

    public close(message?: string) {
        this.siteIdMenu.click();
        this.closeSiteLink.click().then(() => {
            console.log(message + ' Closed the site log page.');
        });
        browser.waitForAngular();
    }
}
