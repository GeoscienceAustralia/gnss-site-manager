import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class OtherInstrumentationGroup extends LogItemGroup {

    readonly instrumentationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="instrumentation"] textarea'));

    private instrumentation: string = 'e2e testing ' + TestUtils.getTimeStamp();

    public constructor() {
        super('Other Instrumentation');
    }

    public getGroupName(): string {
        return this.itemName;
    }

    protected fillOutNewItemForm() {
        this.instrumentationInput.sendKeys(this.instrumentation);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.instrumentationInput, 'Instrumentation', this.instrumentation);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
