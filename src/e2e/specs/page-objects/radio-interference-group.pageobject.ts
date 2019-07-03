import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class RadioInterferenceGroup extends LogItemGroup {

    readonly possibleProblemSourceInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="possibleProblemSource"] input'));
    readonly observedDegradationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="observedDegradation"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Radio Interference');
        this.inputElements = [
            this.possibleProblemSourceInput,
            this.observedDegradationInput,
            this.notesInput,
        ];
    }
}
