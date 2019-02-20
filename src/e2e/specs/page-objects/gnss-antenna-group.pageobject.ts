import { by, ElementFinder } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class GnssAntennaGroup extends LogItemGroup {

    readonly antennaTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaType"] input'));
    readonly serialNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="serialNumber"] input'));
    readonly antennaReferencePointInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaReferencePoint"] input'));
    readonly markerArpEastEccInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="markerArpEastEcc"] input'));
    readonly markerArpUpEccInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="markerArpUpEcc"] input'));
    readonly markerArpNorthEccInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="markerArpNorthEcc"] input'));
    readonly alignmentFromTrueNorthInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="alignmentFromTrueNorth"] input'));
    readonly antennaRadomeTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaRadomeType"] input'));
    readonly radomeSerialNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="radomeSerialNumber"] input'));
    readonly antennaCableTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaCableType"] input'));
    readonly antennaCableLengthInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="antennaCableLength"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    private antennaType: string = 'ASH700936B_L';
    private serialNumber: string = '1616';
    private antennaReferencePoint: string = 'BBPPAA';
    private markerArpEastEcc: string = '1';
    private markerArpUpEcc: string = '2';
    private markerArpNorthEcc: string = '3';
    private alignmentFromTrueNorth: string = '0';
    private antennaRadomeType: string = 'SNOW_1';
    private radomeSerialNumber: string = 'SNOW_Test';
    private antennaCableType: string = 'SNOW_2';
    private antennaCableLength: string = '100';

    public constructor() {
        super('GNSS Antenna');
    }

    protected fillOutNewItemForm() {
        this.antennaTypeInput.sendKeys(this.antennaType);
        this.serialNumberInput.sendKeys(this.serialNumber);
        this.antennaReferencePointInput.sendKeys(this.antennaReferencePoint);
        this.markerArpEastEccInput.sendKeys(this.markerArpEastEcc);
        this.markerArpUpEccInput.sendKeys(this.markerArpUpEcc);
        this.markerArpNorthEccInput.sendKeys(this.markerArpNorthEcc);
        this.alignmentFromTrueNorthInput.sendKeys(this.alignmentFromTrueNorth);
        this.antennaRadomeTypeInput.sendKeys(this.antennaRadomeType);
        this.radomeSerialNumberInput.sendKeys(this.radomeSerialNumber);
        this.antennaCableTypeInput.sendKeys(this.antennaCableType);
        this.antennaCableLengthInput.sendKeys(this.antennaCableLength);
        this.notesInput.sendKeys(this.notes);
    }

    protected checkValues() {
        TestUtils.checkInputValueEqual(this.antennaTypeInput, 'AntennaType', this.antennaType);
        TestUtils.checkInputValueEqual(this.serialNumberInput, 'SerialNumber', this.serialNumber);
        TestUtils.checkInputValueEqual(this.antennaReferencePointInput, 'AntennaReferencePoint', this.antennaReferencePoint);
        TestUtils.checkInputValueEqual(this.markerArpEastEccInput, 'MarkerArpEastEcc', this.markerArpEastEcc);
        TestUtils.checkInputValueEqual(this.markerArpUpEccInput, 'MarkerArpUpEcc', this.markerArpUpEcc);
        TestUtils.checkInputValueEqual(this.markerArpNorthEccInput, 'MarkerArpNorthEcc', this.markerArpNorthEcc);
        TestUtils.checkInputValueEqual(this.alignmentFromTrueNorthInput, 'AlignmentFromTrueNorth', this.alignmentFromTrueNorth);
        TestUtils.checkInputValueEqual(this.antennaRadomeTypeInput, 'AntennaRadomeType', this.antennaRadomeType);
        TestUtils.checkInputValueEqual(this.radomeSerialNumberInput, 'RadomeSerialNumber', this.radomeSerialNumber);
        TestUtils.checkInputValueEqual(this.antennaCableTypeInput, 'antennaCableType', this.antennaCableType);
        TestUtils.checkInputValueEqual(this.antennaCableLengthInput, 'AntennaCableLength', this.antennaCableLength);
        TestUtils.checkInputValueEqual(this.notesInput, 'Notes', this.notes);
        TestUtils.checkInputValueNotNull(this.newDateInstalledInput, 'current DateInstalled');
        if(this.noOfItems > 0) {
            TestUtils.checkInputValueNotNull(this.prevDateRemovedInput, 'previous DateRemoved');
        }
    }
}
