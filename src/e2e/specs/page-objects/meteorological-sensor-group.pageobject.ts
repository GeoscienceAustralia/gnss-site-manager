import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
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
    readonly accuracyHPaInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="accuracyHPa"] input'));
    readonly accuracyPercentRelativeHumidityInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="accuracyPercentRelativeHumidity"] input'));
    readonly accuracyDegreesCelciusInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="accuracyDegreesCelcius"] input'));
    readonly heightDiffToAntennaInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="heightDiffToAntenna"] input'));
    readonly aspirationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="aspiration"] input'));
    readonly calibrationDateInput: ElementFinder = this.currentItemContainer
                    .element(by.css('datetime-input[controlName="calibrationDate"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private viewModel: any;

    public constructor(sensorName: string, viewModel: any) {
        super(sensorName);
        this.viewModel = viewModel;
    }

    protected fillOutNewItemForm() {
        this.manufacturerInput.sendKeys(this.viewModel.manufacturer);
        this.typeInput.sendKeys(this.viewModel.type);
        this.serialNumberInput.sendKeys(this.viewModel.serialNumber);
        this.heightDiffToAntennaInput.sendKeys(this.viewModel.heightDiffToAntenna.toString());
        this.enterDateTime(this.calibrationDateInput, this.viewModel.calibrationDate);
        this.notesInput.sendKeys(this.viewModel.notes);

        if (this.itemName === 'Humidity Sensor') {
            this.accuracyPercentRelativeHumidityInput.sendKeys(this.viewModel.accuracyPercentRelativeHumidity.toString());
            this.aspirationInput.sendKeys(this.viewModel.aspiration.toString());
        } else if(this.itemName === 'Pressure Sensor') {
            this.accuracyHPaInput.sendKeys(this.viewModel.accuracyHPa.toString());
        } else if (this.itemName === 'Temperature Sensor') {
            this.accuracyDegreesCelciusInput.sendKeys(this.viewModel.accuracyDegreesCelcius.toString());
            this.aspirationInput.sendKeys(this.viewModel.aspiration.toString());
        }

        if (this.itemName !== 'Water Vapor Sensor') {
            this.dataSamplingIntervalInput.sendKeys(this.viewModel.dataSamplingInterval.toString());
        }
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.manufacturerInput, 'Manufacturer', this.viewModel.manufacturer);
        TestUtils.checkInputValueEqual(this.typeInput, 'Type', this.viewModel.type);
        TestUtils.checkInputValueEqual(this.serialNumberInput, 'Serial Number', this.viewModel.serialNumber);
        TestUtils.checkInputValueEqual(this.heightDiffToAntennaInput, 'Height Diff To Antenna',
                    this.viewModel.heightDiffToAntenna);
        TestUtils.checkInputValueEqual(this.calibrationDateInput, 'Calibration Date', this.viewModel.calibrationDate);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.viewModel.notes);
        if (this.itemName === 'Humidity Sensor') {
            TestUtils.checkInputValueEqual(this.accuracyPercentRelativeHumidityInput,
                    'Accuracy Percent Relative Humidity', this.viewModel.accuracyPercentRelativeHumidity);
            TestUtils.checkInputValueEqual(this.aspirationInput, 'Aspiration', this.viewModel.aspiration);
        } else if(this.itemName === 'Pressure Sensor') {
            TestUtils.checkInputValueEqual(this.accuracyHPaInput, 'Accuracy HPa', this.viewModel.accuracyHPa);
        } else if (this.itemName === 'Temperature Sensor') {
            TestUtils.checkInputValueEqual(this.accuracyDegreesCelciusInput, 'Accuracy Degrees Celcius',
                    this.viewModel.accuracyDegreesCelcius);
            TestUtils.checkInputValueEqual(this.aspirationInput, 'Aspiration ', this.viewModel.aspiration);
        }
        if (this.itemName !== 'Water Vapor Sensor') {
            TestUtils.checkInputValueEqual(this.dataSamplingIntervalInput, 'Data Sampling Interval',
                    this.viewModel.dataSamplingInterval);
        }

        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
