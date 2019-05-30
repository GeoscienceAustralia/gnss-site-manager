import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';
import { TestUtils } from '../utils/test.utils';

export class LogItemGroup {

    readonly deletionReasonDialog: ElementFinder = element(by.cssContainingText('.dialog', 'Deletion Reason'));
    readonly deleteReasonInput: ElementFinder = this.deletionReasonDialog.element(by.css('input[type="text"]'));
    readonly confirmDeleteButton: ElementFinder = this.deletionReasonDialog.element(by.buttonText('OK'));

    readonly itemGroupHeader: ElementFinder;
    readonly items: ElementArrayFinder;
    readonly newItemButton: ElementFinder;
    readonly currentItemContainer: ElementFinder;
    readonly currentItemHeader: ElementFinder;
    readonly firstDeleteButton: ElementFinder;
    readonly newDateInstalledInput: ElementFinder;
    readonly prevDateRemovedInput: ElementFinder;

    public itemName: string;
    public elementName: string;
    public newItemIndex: number;

    public constructor(itemName: string) {
        this.newItemIndex = 0;
        this.itemName = itemName;
        this.elementName = _.kebabCase(itemName);
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

    public addNewItem() {
        this.newItemButton.click().then(() => {
            console.log('Add a new ' + this.itemName + ' item');
        });
        browser.waitForAngular();
    }

    public getItemContainer(index: number): ElementFinder {
        this.newItemIndex = index;
        return element(by.id(this.elementName + '-' + index));
    }

    public getDeleteButton(): ElementFinder {
        let itemContainer: ElementFinder = this.getItemContainer(this.newItemIndex);
        return itemContainer.element(by.buttonText('Delete'));;
    }

    /**
     * Delete the new item with or without a reason
     */
    public deleteItem(deleteReason?: string) {
        this.itemGroupHeader.click().then(() => {
            console.log('Open ' + this.getGroupName() + ' group');
            browser.waitForAngular();

            this.getDeleteButton().click().then(() => {
                console.log('Click "Delete" button of the ' + TestUtils.getOrdinalNumber(this.newItemIndex + 1) + ' item');
            });
            browser.waitForAngular();

            if(deleteReason) {
                this.deleteReasonInput.sendKeys(deleteReason);
                this.confirmDeleteButton.click().then(() => {
                    console.log('Deleted ' + TestUtils.getOrdinalNumber(this.newItemIndex + 1) + ' '
                                + this.itemName + ' item for the reason: ' + deleteReason);
                });
            } else {
                element(by.buttonText('Yes')).click().then(() => {
                    console.log('Deleted ' + TestUtils.getOrdinalNumber(this.newItemIndex + 1) + ' ' + this.itemName + ' item.');
                });
            }
            browser.waitForAngular();
        });
    }
}
