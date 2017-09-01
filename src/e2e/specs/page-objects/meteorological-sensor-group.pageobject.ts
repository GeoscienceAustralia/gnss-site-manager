import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

/**
 *  This class represents one of meteorological sensors, such as Pressure, Humidity, Temperature, and Water Vapor sensors
 */
export class MeteorologicalSensorGroup extends LogItemGroup {

    readonly manufacturerInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="manufacturer"] input'));
    readonly typeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="type"] input'));
    readonly serialNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="serialNumber"] input'));
    readonly dataSamplingIntervalInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dataSamplingInterval"] input'));
    readonly accuracyInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="accuracy"] input'));
    readonly heightDiffToAntennaInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="heightDiffToAntenna"] input'));
    readonly aspirationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="aspiration"] input'));
    readonly calibrationDateInput: ElementFinder = this.currentItemContainer
                    .element(by.css('datetime-input[controlName="calibrationDate"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor(sensorName: string) {
        super(sensorName);
    }
}
