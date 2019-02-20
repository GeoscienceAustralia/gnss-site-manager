import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';
import { TestUtils } from '../utils/test.utils';

export abstract class LogItemGroup {

    readonly deletionReasonDialog: ElementFinder = element(by.cssContainingText('.dialog', 'Deletion Reason'));
    readonly deleteReasonInput: ElementFinder = this.deletionReasonDialog.element(by.css('input[type="text"]'));
    readonly confirmDeleteButton: ElementFinder = this.deletionReasonDialog.element(by.buttonText('OK'));
    readonly itemGroupHeader: ElementFinder;
    readonly newItemButton: ElementFinder;
    readonly currentItemContainer: ElementFinder;
    readonly currentItemHeader: ElementFinder;
    readonly firstDeleteButton: ElementFinder;
    readonly newDateInstalledInput: ElementFinder;
    readonly prevDateRemovedInput: ElementFinder;

    public items: ElementArrayFinder;
    public newItemIndex: number;
    public noOfItems: number;
    public itemName: string;
    public elementName: string;
    public timestamp: string;
    public notes: string;
    public deleteReason: string;

    public constructor(itemName: string) {
        this.newItemIndex = 0;
        this.noOfItems = 0;
        this.itemName = itemName;
        this.elementName = _.kebabCase(itemName);

        this.timestamp = TestUtils.getTimeStamp();
        this.notes = 'e2e testing - add a new item ' + this.timestamp;
        this.deleteReason = 'e2e testing - delete an item ' + this.timestamp;

        this.items = element.all(by.css(this.elementName + '-item'));
        this.newItemButton = element(by.id('new-' + this.elementName));
        this.itemGroupHeader = element(by.cssContainingText('div.group-header>span.panel-title', this.getGroupName()));
        this.currentItemContainer = element(by.id(this.elementName + '-0'));
        this.currentItemHeader = this.currentItemContainer.element(by.css('span.panel-title'));
        this.firstDeleteButton = this.currentItemContainer.element(by.buttonText('Delete'));
        this.newDateInstalledInput = this.currentItemContainer.element(by.css('datetime-input[controlName="startDate"] input'));
        this.prevDateRemovedInput = element(by.id(this.elementName + '-1')).element(by.css('datetime-input[controlName="endDate"] input'));
    }

    public getGroupName(): string {
        return this.itemName + 's';
    }

    public getItemContainer(index: number): ElementFinder {
        this.newItemIndex = index;
        return element(by.id(this.elementName + '-' + index));
    }

    public getDeleteButton(): ElementFinder {
        let itemContainer: ElementFinder = this.getItemContainer(this.newItemIndex);
        return itemContainer.element(by.buttonText('Delete'));
    }

    /**
     * Add a new item and fill out with initial values
     */
    public addNewItem() {
        this.items.count().then((value: number) => {
            this.noOfItems = value;
            console.log('\tNumber of ' + this.itemName + ' items before adding new item: ' + value);
            this.newItemButton.click().then(() => {
                console.log('\tAdd a new ' + this.itemName + ' item');
                this.fillOutNewItemForm();
            });
        });
    }

    /**
     * Check if the input values are saved correctly
     */
    public checkInputValues() {
        TestUtils.checkItemCount(this.items, 'adding new item', this.noOfItems + 1);
        this.itemGroupHeader.click().then(() => {
            console.log('    Open ' + this.itemName + ' group');
            this.currentItemHeader.click().then(() => {
                this.checkValues();
            });
        });
    }

    /**
     * Delete the new item with or without a reason
     */
    public deleteItem(deleteReason?: string) {
        console.log('    Open ' + this.getGroupName() + ' group');
        this.getDeleteButton().click().then(() => {
            if(deleteReason) {
                this.deleteReasonInput.sendKeys(deleteReason);
                this.confirmDeleteButton.click().then(() => {
                    console.log('\tDeleted ' + TestUtils.getOrdinalNumber(this.newItemIndex + 1) + ' '
                                + this.itemName + ' item for the reason: ' + deleteReason);
                });
            } else {
                element(by.buttonText('Yes')).click().then(() => {
                    console.log('\tDeleted ' + TestUtils.getOrdinalNumber(this.newItemIndex + 1)
                                + ' ' + this.itemName + ' item.');
                });
            }
        });
        browser.waitForAngular();
    }

    public deleteNewItem() {
        //this.itemGroupHeader.click().then(() => {
            this.deleteItem(this.deleteReason);
        //});
    }

    public checkItemDeleted() {
        TestUtils.checkItemCount(this.items, 'deleting an item', this.noOfItems);
    }

    public enterDateTime(dateInput: ElementFinder, datetimeValue: string) {
        dateInput.sendKeys(datetimeValue);
        let okButton: ElementFinder = element(by.buttonText('OK'));
        okButton.click();
    }

    /**
     * Abstract methods to be implemented by subclasses
     */
    protected abstract fillOutNewItemForm();

    protected abstract checkValues(useBackupModel?: boolean);
}
