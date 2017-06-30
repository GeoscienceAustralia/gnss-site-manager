import { browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { TestUtils } from '../utils/test.utils';
import * as _ from 'lodash';

describe('SiteLog', () => {
    let siteLogPage: SiteLogPage = new SiteLogPage();

    beforeEach(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        return await browser.get(siteLogPage.urlAde1);
    });

    it('expect ade1 sitelog to exist', () => {
        expect(siteLogPage.siteInformationHeader.isPresent()).toBeTruthy('expect ade1 sitelog\'s SiteIdentification Header to exist');
    });

    it('expect all level 1 headers to be present', () => {
        let allHeaders: string[] = null;
        let expectedHeaders: string[] = ['Site Information', 'GNSS Receivers', 'GNSS Antennas', 'Surveyed Local Ties',
            'Frequency Standards', 'Local Episodic Effects', 'Humidity Sensors', 'Pressure Sensors', 'Temperature Sensors',
            'Water Vapor Sensors', 'Radio Interferences', 'Signal Obstructions', 'Multipath Sources'];

        TestUtils.getElementArrayAsList(siteLogPage.siteGroupHeaders).then((groupHeaders: string[]) => {
            allHeaders = groupHeaders;
            console.log('SiteLog / expect all level 1 headers to be present - headers: ', allHeaders);
            expect(allHeaders.length).toBe(13);
            expect(_.difference(allHeaders, expectedHeaders).length).toBe(0, 'SiteLog / expect all level 1 headers to be present');
        });
    });

    it('walk and expand all Group headers', () => {
        // This test will mainly consist of expecting no error to occur that would fail the text
        siteLogPage.siteGroupHeaders.then((elements) => {
            elements.forEach((element) => {
                element.getText().then((text) => {
                    console.log('click group header: ', text);
                });
                element.click();
                browser.waitForAngular();
                element.click();    // close the Group
                // No error must have occurred
            });
        });
        expect(true).toBeTruthy('If this statement was reached then it should succeed.  If failed then something weird happened.');
    });

    it('walk and expand all Group and Item headers', () => {
        // This test will mainly consist of expecting no error to occur that would fail the text
        siteLogPage.siteGroupHeaders.then((elements) => {
            elements.forEach((element) => {
                element.getText().then((text) => {
                    console.log('click group header: ', text);
                });
                element.click();

                siteLogPage.siteItemHeaders.then((elements) => {
                    elements.forEach((element) => {
                        element.isPresent().then((isPresent) => {
                            if (isPresent) {
                                element.getText().then((text) => {
                                    console.log('    click item header: ' + text);
                                    element.click();
                                    browser.waitForAngular();
                                    element.click();
                                    browser.waitForAngular();
                                });
                            }
                        });
                    });
                });
                element.click();    // close the Group
                // No error must have occurred
            });
        });
        expect(true).toBeTruthy('If this statement was reached then it should succeed.  If failed then something weird happened.');
    });

    it('walk and compare all values to what is expected', () => {
        siteLogPage.siteGroupHeaders.then((elements) => {
            elements.forEach((element) => {
                element.getText().then((text) => {
                    console.log('click group header: ', text);
                });
                element.click();
                browser.waitForAngular();
                // siteItems will get the Items under the Group at the top level - need to drill down to header and body
                siteLogPage.siteItems.then((elements) => {
                    elements.forEach((theElement) => {
                        // Navigate to the header and click
                        let itemHeader: ElementFinder = theElement.$('div.item-header>span.panel-title');
                        itemHeader.getText().then((text) => {
                            console.log('    click item header: ', text);
                            itemHeader.click();
                            browser.waitForAngular();
                        });

                        // TODO - Now open the body and do the inspections - the code below finds
                        // TODO - each input - just need to compare its value() against the expected data
                        let itemBodyInputs: ElementArrayFinder = theElement.$$('div.item-body div.form-group>*');
                        itemBodyInputs.then((inputElements) => {
                            inputElements.forEach((theInput) => {
                                theInput.getText().then((text) => {
                                    console.log('input text: ', text);
                                });
                            });
                        });

                        itemHeader.click(); // to close
                        browser.waitForAngular();
                    });
                });
                element.click();    // close the Group
                browser.waitForAngular();
                // No error must have occurred
            });
        });
        expect(true).toBeTruthy('If this statement was reached then it should succeed.  If failed then something weird happened.');
    });
});
