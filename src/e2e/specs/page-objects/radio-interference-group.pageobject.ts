import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class RadioInterferenceGroup extends LogItemGroup {

    readonly possibleProblemSourceInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="possibleProblemSource"] input'));
    readonly observedDegradationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="observedDegradation"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private possibleProblemSource: string = 'External source';
    private observedDegradation: string = 'Unknown';

    public constructor() {
        super('Radio Interference');
    }

    protected fillOutNewItemForm() {
        this.possibleProblemSourceInput.sendKeys(this.possibleProblemSource);
        this.observedDegradationInput.sendKeys(this.observedDegradation);
        this.notesInput.sendKeys(this.notes);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.possibleProblemSourceInput, 'Possible Problem Source', this.possibleProblemSource);
        TestUtils.checkInputValueEqual(this.observedDegradationInput, 'Observed Degradation', this.observedDegradation);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.notes);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
