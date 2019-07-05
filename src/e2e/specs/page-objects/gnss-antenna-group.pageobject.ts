import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class GnssAntennaGroup extends LogItemGroup {

    readonly antennaTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaType"]'));
    readonly serialNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="serialNumber"]'));
    readonly antennaReferencePointInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaReferencePoint"]'));
    readonly markerArpEastEccInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="markerArpEastEcc"]'));
    readonly markerArpUpEccInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="markerArpUpEcc"]'));
    readonly markerArpNorthEccInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="markerArpNorthEcc"]'));
    readonly alignmentFromTrueNorthInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="alignmentFromTrueNorth"]'));
    readonly antennaRadomeTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaRadomeType"]'));
    readonly radomeSerialNumberInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="radomeSerialNumber"]'));
    readonly antennaCableTypeInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="antennaCableType"]'));
    readonly antennaCableLengthInput: ElementFinder = this.newItemContainer
                    .element(by.css('number-input[controlName="antennaCableLength"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor() {
        super('GNSS Antenna');
        this.getInputElements();
    }

    public getInputElements() {
        this.inputElements = [
            this.antennaTypeInput,
            this.serialNumberInput,
            this.antennaReferencePointInput,
            this.markerArpEastEccInput,
            this.markerArpUpEccInput,
            this.markerArpNorthEccInput,
            this.alignmentFromTrueNorthInput,
            this.antennaRadomeTypeInput,
            this.radomeSerialNumberInput,
            this.antennaCableTypeInput,
            this.antennaCableLengthInput,
            this.notesInput,
        ];
    }
}
