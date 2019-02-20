import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class FrequencyStandardGroup extends LogItemGroup {

    readonly standardTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="standardType"] input'));
    readonly inputFrequencyInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="inputFrequency"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private standardType: string = 'Cesium - Rcvr 3';
    private inputFrequency: string = '1080';

    public constructor() {
        super('Frequency Standard');
    }

    protected fillOutNewItemForm() {
        this.standardTypeInput.sendKeys(this.standardType);
        this.inputFrequencyInput.sendKeys(this.inputFrequency);
        this.notesInput.sendKeys(this.notes);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.standardTypeInput, 'StandardType', this.standardType);
        TestUtils.checkInputValueEqual(this.inputFrequencyInput, 'InputFrequency', this.inputFrequency);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.notes);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
