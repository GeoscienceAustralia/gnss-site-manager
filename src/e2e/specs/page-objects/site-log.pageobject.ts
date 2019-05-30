import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';
import { BasePage } from './base.pageobject';
import { ResponsiblePartyGroup } from './responsible-party-group.pageobject';
import { GnssReceiverGroup } from './gnss-receiver-group.pageobject';
import { GnssAntennaGroup } from './gnss-antenna-group.pageobject';
import { SurveyedLocalTieGroup } from './surveyed-local-tie-group.pageobject';
import { FrequencyStandardGroup } from './frequency-standard-group.pageobject';
import { CollocationInformationGroup } from './collocation-information-group.pageobject';
import { LocalEpisodicEffectGroup } from './local-episodic-effect-group.pageobject';
import { MeteorologicalSensorGroup } from './meteorological-sensor-group.pageobject';
import { OtherInstrumentationGroup } from './other-instrumentation-group.pageobject';
import { RadioInterferenceGroup } from './radio-interference-group.pageobject';
import { SignalObstructionGroup } from './signal-obstruction-group.pageobject';
import { MultipathSourceGroup } from './multipath-source-group.pageobject';

export class SiteLogPage extends BasePage {
    readonly siteInformationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    readonly levelOneDirtyHeaders: ElementArrayFinder = element.all(by.css('div.panel-level-1.ng-dirty'));
    readonly siteNameInput: ElementFinder = element(by.css('site-identification text-input[controlName="siteName"] input'));
    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));
    readonly statusInfoBar: ElementFinder = element(by.css('div.status-info-bar'));

    readonly siteOwnerGroup = new ResponsiblePartyGroup('Site Owner');
    readonly siteContactGroup = new ResponsiblePartyGroup('Site Contact');
    readonly siteMetadataCustodianGroup = new ResponsiblePartyGroup('Site Metadata Custodian');
    readonly siteDataCenterGroup = new ResponsiblePartyGroup('Site Data Center');
    readonly siteDataSourceGroup = new ResponsiblePartyGroup('Site Data Source');
    readonly gnssReceiverGroup = new GnssReceiverGroup();
    readonly gnssAntennaGroup = new GnssAntennaGroup();
    readonly surveyedLocalTieGroup = new SurveyedLocalTieGroup();
    readonly frequencyStandardGroup = new FrequencyStandardGroup();
    readonly collocationInformationGroup = new CollocationInformationGroup();
    readonly localEpisodicEffectGroup = new LocalEpisodicEffectGroup();
    readonly humiditySensorGroup = new MeteorologicalSensorGroup('Humidity Sensor');
    readonly pressureSensorGroup = new MeteorologicalSensorGroup('Pressure Sensor');
    readonly temperatureSensorGroup = new MeteorologicalSensorGroup('Temperature Sensor');
    readonly waterVaporSensorGroup = new MeteorologicalSensorGroup('Water Vapor Sensor');
    readonly otherInstrumentationGroup = new OtherInstrumentationGroup();
    readonly radioInterferenceGroup = new RadioInterferenceGroup();
    readonly signalObstructionGroup = new SignalObstructionGroup();
    readonly multipathSourceGroup = new MultipathSourceGroup();

    public identifyingElement(): ElementFinder {
        return this.siteInformationHeader;
    }

    public getGroupHeader(parentElem: ElementFinder): ElementFinder {
        return parentElem.element(by.css('div.group-header>span.panel-title'));
    }

    public getDirtyItems(groupName: string): ElementArrayFinder {
        let elementName: string = _.kebabCase(groupName);
        if (elementName[elementName.length-1] === 's') {
            elementName = elementName.slice(0,-1);
        }
        return element.all(by.css(elementName + '-item div.panel-level-2.ng-dirty'));
    }

    public getItemHeader(parentElem: ElementFinder): ElementFinder {
        return parentElem.element(by.css('div.item-header>span.panel-title'));
    }

    public getDirtyFields(parentElem: ElementFinder): ElementArrayFinder {
        return parentElem.all(by.css('div.form-group.ng-dirty'));
    }

    public getDirtyFieldInput(parentElem: ElementFinder): ElementFinder {
        return parentElem.element(by.css('.form-control.ng-dirty'));
    }

    public getDirtyFieldLabel(parentElem: ElementFinder): ElementFinder {
        return parentElem.element(by.css('label.control-label'));
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

    public closeAfterConfirmation() {
        this.siteIdMenu.click();
        this.closeSiteLink.click().then(() => {
            this.confirmYesButton.isPresent().then((askConfirmation: boolean) => {
                if (askConfirmation) {
                    this.confirmYesButton.click();
                }
            });
        });
        browser.waitForAngular();
    }

}
