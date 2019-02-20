import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class CollocationInformationGroup extends LogItemGroup {

    readonly instrumentationTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="instrumentationType"] input'));
    readonly statusInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="status"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private instrumentationType: string = 'Unknown';
    private status: string = 'OK';

    public constructor() {
        super('Collocation Information');
    }

    public getGroupName(): string {
        return this.itemName;
    }

    protected fillOutNewItemForm() {
        this.instrumentationTypeInput.sendKeys(this.instrumentationType);
        this.statusInput.sendKeys(this.status);
        this.notesInput.sendKeys(this.notes);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.instrumentationTypeInput, 'Instrumentation Type', this.instrumentationType);
        TestUtils.checkInputValueEqual(this.statusInput, 'status', this.status);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.notes);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
