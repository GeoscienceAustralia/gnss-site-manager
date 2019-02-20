import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';
import { BasePage } from './base.pageobject';
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
import { mockHumiditySensor, mockPressureSensor, mockTemperatureSensor, mockWaterVaporSensor } from './view-model';
import { LogItemGroup } from './log-item-group.pageobject';

export class SiteLogPage extends BasePage {
    readonly siteInformationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    readonly levelOneDirtyHeaders: ElementArrayFinder = element.all(by.css('div.panel-level-1.ng-dirty'));
    readonly siteNameInput: ElementFinder = element(by.css('site-identification text-input[controlName="siteName"] input'));
    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));
    readonly statusInfoBar: ElementFinder = element(by.css('div.status-info-bar'));

    public siteLogGroups: LogItemGroup[] = [
        new GnssReceiverGroup(),
        new GnssAntennaGroup(),
        new SurveyedLocalTieGroup(),
        new FrequencyStandardGroup(),
        new CollocationInformationGroup(),
        new LocalEpisodicEffectGroup(),
        new MeteorologicalSensorGroup('Humidity Sensor', mockHumiditySensor),
        new MeteorologicalSensorGroup('Pressure Sensor', mockPressureSensor),
        new MeteorologicalSensorGroup('Temperature Sensor', mockTemperatureSensor),
        new MeteorologicalSensorGroup('Water Vapor Sensor', mockWaterVaporSensor),
        new OtherInstrumentationGroup(),
        new RadioInterferenceGroup(),
        new SignalObstructionGroup(),
        new MultipathSourceGroup(),
    ];

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
        this.siteIdMenu.click().then(() => {
            this.saveSiteLink.click().then(() => {
                this.confirmYesButton.click().then(() => {
                    console.log('\tSave all changes made.');
                });
            });
        });
        browser.waitForAngular();
    }

    public revert() {
        this.siteIdMenu.click().then(() => {
            this.revertSiteLink.click().then(() => {
                this.confirmYesButton.click().then(() => {
                    console.log('\tRevert the site log page');
                });
            });
        });
        browser.waitForAngular();
    }

    /*
     * Reload the sitelog page with given siteId.
     *
     * Sometimes when saving and then immediately reloading the sitelog page, an unexpected alert
     * dialog may occur, asking: "Reload site? Changes you made may not be saved." We have to click
     * the "Reload" button to close this alert so that the e2e tests can proceed.
     *
     * Note: window.location.reload() and browser.refresh() won't work here
     */
    public reload(siteId: string) {
        let url = '/siteLog/' + siteId;
        browser.get(url).catch(() => {
            return browser.switchTo().alert().then((alert) => {
                alert.accept();
                return browser.get(url).then(() => {
                    console.log('    Close "Reload" alert dialog and proceed to reload ' + siteId + ' sitelog page.');
                });
            });
        }).then(() => {
            console.log('    Reloaded ' + siteId + ' sitelog page.');
        });
        browser.waitForAngular();
    }

    public close(message?: string) {
        this.siteIdMenu.click().then(() => {
            this.closeSiteLink.click().then(() => {
                if (message) {
                    console.log('\t' + message + ' Closed the site log page.');
                } else {
                    console.log('\tClosed the site log page.');
                }
            });
        });
        browser.waitForAngular();
    }

    public closeAfterConfirmation() {
        this.siteIdMenu.click().then(() => {
            this.closeSiteLink.click().then(() => {
                this.confirmYesButton.isPresent().then((askConfirmation: boolean) => {
                    if (askConfirmation) {
                        this.confirmYesButton.click();
                    }
                });
            });
        });
        browser.waitForAngular();
    }
}
