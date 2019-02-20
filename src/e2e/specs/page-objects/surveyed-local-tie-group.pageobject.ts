import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class SurveyedLocalTieGroup extends LogItemGroup {

    readonly tiedMarkerNameInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerName"] input'));
    readonly tiedMarkerUsageInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerUsage"] input'));
    readonly tiedMarkerCDPNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerCDPNumber"] input'));
    readonly tiedMarkerDOMESNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerDOMESNumber"] input'));
    readonly dxInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dx"] input'));
    readonly dyInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dy"] input'));
    readonly dzInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dz"] input'));
    readonly localSiteTiesAccuracyInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="localSiteTiesAccuracy"] input'));
    readonly surveyMethodInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="surveyMethod"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private tiedMarkerName: string = 'UNK-Test';
    private tiedMarkerUsage: string = 'FOOTPRINT';
    private tiedMarkerCDPNumber: string = 'A14';
    private tiedMarkerDOMESNumber: string = 'A19';
    private dx: string = '2';
    private dy: string = '3';
    private dz: string = '4';
    private localSiteTiesAccuracy: string = '0';
    private surveyMethod: string = 'TRIANGULATION';

    public constructor() {
        super('Surveyed Local Tie');
    }

    protected fillOutNewItemForm() {
        this.tiedMarkerNameInput.sendKeys(this.tiedMarkerName);
        this.tiedMarkerUsageInput.sendKeys(this.tiedMarkerUsage);
        this.tiedMarkerCDPNumberInput.sendKeys(this.tiedMarkerCDPNumber);
        this.tiedMarkerDOMESNumberInput.sendKeys(this.tiedMarkerDOMESNumber);
        this.dxInput.sendKeys(this.dx);
        this.dyInput.sendKeys(this.dy);
        this.dzInput.sendKeys(this.dz);
        this.localSiteTiesAccuracyInput.sendKeys(this.localSiteTiesAccuracy);
        this.surveyMethodInput.sendKeys(this.surveyMethod);
        this.notesInput.sendKeys(this.notes);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.tiedMarkerNameInput, 'Tied Marker Name', this.tiedMarkerName);
        TestUtils.checkInputValueEqual(this.tiedMarkerUsageInput, 'Tied Marker Usage', this.tiedMarkerUsage);
        TestUtils.checkInputValueEqual(this.tiedMarkerCDPNumberInput, 'Tied Marker CDP Number', this.tiedMarkerCDPNumber);
        TestUtils.checkInputValueEqual(this.tiedMarkerDOMESNumberInput, 'Tied Marker DOMES Number', this.tiedMarkerDOMESNumber);
        TestUtils.checkInputValueEqual(this.dxInput, 'dx', this.dx);
        TestUtils.checkInputValueEqual(this.dyInput, 'dy', this.dy);
        TestUtils.checkInputValueEqual(this.dzInput, 'dz', this.dz);
        TestUtils.checkInputValueEqual(this.localSiteTiesAccuracyInput, 'Local Site Ties Accuracy', this.localSiteTiesAccuracy);
        TestUtils.checkInputValueEqual(this.surveyMethodInput, 'Survey Method', this.surveyMethod);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.notes);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateMeasured');
    }
}
