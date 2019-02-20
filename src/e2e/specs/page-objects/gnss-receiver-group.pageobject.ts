import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class GnssReceiverGroup extends LogItemGroup {

    readonly receiverTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="receiverType"] input'));
    readonly serialNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="manufacturerSerialNumber"] input'));
    readonly firmwareVersionInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="firmwareVersion"] input'));
    readonly elevationCutoffSettingInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="elevationCutoffSetting"] input'));
    readonly temperatureStabilizationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="temperatureStabilization"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private receiverType: string = 'ASHTECH Z-XII3';
    private serialNumber: string = '8888';
    private firmwareVersion: string = '8Y08-8D08';
    private elevationCutoffSetting: string = '5';
    private temperatureStabilization: string = '10';

    public constructor() {
        super('GNSS Receiver');
    }

    protected fillOutNewItemForm() {
        this.receiverTypeInput.sendKeys(this.receiverType);
        this.serialNumberInput.sendKeys(this.serialNumber);
        this.firmwareVersionInput.sendKeys(this.firmwareVersion);
        this.elevationCutoffSettingInput.sendKeys(this.elevationCutoffSetting);
        this.temperatureStabilizationInput.sendKeys(this.temperatureStabilization);
        this.notesInput.sendKeys(this.notes);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.receiverTypeInput, 'ReceiverType', this.receiverType);
        TestUtils.checkInputValueEqual(this.serialNumberInput, 'SerialNumber', this.serialNumber);
        TestUtils.checkInputValueEqual(this.firmwareVersionInput, 'FirmwareVersion', this.firmwareVersion);
        TestUtils.checkInputValueEqual(this.elevationCutoffSettingInput, 'ElevationCutoffSetting', this.elevationCutoffSetting);
        TestUtils.checkInputValueEqual(this.temperatureStabilizationInput, 'TemperatureStabilization', this.temperatureStabilization);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.notes);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
