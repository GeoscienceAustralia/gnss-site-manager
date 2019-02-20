import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class MultipathSourceGroup extends LogItemGroup {

    readonly possibleProblemSourceInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="possibleProblemSource"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private possibleProblemSource: string = 'External source';

    public constructor() {
        super('Multipath Source');
    }

    protected fillOutNewItemForm() {
        this.possibleProblemSourceInput.sendKeys(this.possibleProblemSource);
        this.notesInput.sendKeys(this.notes);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.possibleProblemSourceInput, 'Possible Problem Source', this.possibleProblemSource);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.notes);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
