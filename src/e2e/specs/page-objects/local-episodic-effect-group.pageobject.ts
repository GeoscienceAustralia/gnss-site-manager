import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class LocalEpisodicEffectGroup extends LogItemGroup {

    readonly eventInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="event"] textarea'));

    private event: string = 'e2e testing' + TestUtils.getTimeStamp();

    public constructor() {
        super('Local Episodic Effect');
    }

    protected fillOutNewItemForm() {
        this.eventInput.sendKeys(this.event);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.eventInput, 'Event', this.event);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
