import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';

export abstract class LogItemGroup {

    readonly deletionReasonDialog: ElementFinder = element(by.cssContainingText('.dialog', 'Deletion Reason'));
    readonly deleteReasonInput: ElementFinder = this.deletionReasonDialog.element(by.css('input[type="text"]'));
    readonly confirmDeleteButton: ElementFinder = this.deletionReasonDialog.element(by.buttonText('OK'));
    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));
    readonly groupHeader: ElementFinder;
    readonly addNewItemButton: ElementFinder;
    readonly updateItemButton: ElementFinder;

    public items: ElementArrayFinder;
    public newItemContainer: ElementFinder;

    public newItemIndex: number;
    public noOfItems: number;
    public itemName: string;
    public controlName: string;
    public elementName: string;
    public hasEndDateInput: boolean;

    public constructor(itemName: string) {
        this.newItemIndex = 0;    // by default, the new item is the first one
        this.noOfItems = 0;
        this.itemName = itemName;
        this.controlName = _.camelCase(itemName);
        this.elementName = _.kebabCase(itemName);
        this.hasEndDateInput = true;

        this.items = element.all(by.css(this.elementName + '-item'));
        this.groupHeader = element(by.cssContainingText('div.group-header>span.panel-title', this.getGroupName()));
        this.addNewItemButton = element(by.id('new-' + this.elementName));
        this.updateItemButton = element(by.id('update-' + this.elementName));
        this.newItemContainer = this.getNewItemContainer();
    }

    public getGroupName(): string {
        return this.itemName + 's';
    }

    public getNewItemContainer(): ElementFinder {
        return this.getItemContainer(this.newItemIndex);
    }

    public getItemContainer(index: number): ElementFinder {
        return element(by.id(this.elementName + '-' + index));
    }

    public getNewItemHeader(): ElementFinder {
        let itemContainer: ElementFinder = this.getNewItemContainer();
        return itemContainer.element(by.css('span.panel-title'));
    }

    public getNewItemStartDateInput(): ElementFinder {
        let itemContainer: ElementFinder = this.getNewItemContainer();
        return itemContainer.element(by.css('datetime-input[controlName="startDate"] input'));
    }

    /**
     * Return the EndDate input element of the previous item.
     *
     * When adding a new item, the EndDate input field of the second item will be entered
     * a datetime value which is the same value as the StartDate field of the new item (first item).
     */
    public getSecondItemEndDateInput(): ElementFinder {
        let itemContainer: ElementFinder = this.getItemContainer(1);
        return itemContainer.element(by.css('datetime-input[controlName="endDate"] input'));
    }

    public getDeleteButton(): ElementFinder {
        let itemContainer: ElementFinder = this.getNewItemContainer();
        return itemContainer.element(by.buttonText('Delete'));
    }

    public enterDateTime(dateInput: ElementFinder, datetimeValue: string) {
        dateInput.sendKeys(datetimeValue);
        let okButton: ElementFinder = element(by.buttonText('OK'));
        okButton.click();
    }

    /**
     * Define fields used by update function. Must be override by Antenna and Receiver groups
     */
    public getUpdatableInputFields(): ElementFinder[] {
        return [];
    }

    /**
     * Define abstract methods to be implemented by subclasses
     */
    public abstract getAllInputFields(): ElementFinder[];
}
