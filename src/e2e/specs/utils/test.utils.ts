import { ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import * as moment from 'moment';

export class TestUtils {
    /**
     * Search for the given searchText in any element's text (content) in the array of elements.  An array is
     * returned from Protractors `element.all(selector)`
     *
     * @param elementArray
     * @param searchText
     * @return {ElementArrayFinder} of the elements in the array with the searchText
     */
    public static elementArrayContaining(elementArray: ElementArrayFinder, searchText: string): ElementArrayFinder {
        return elementArray.filter(function (element: ElementFinder) {
            return element.getText().then((text) => {
                return text.toLowerCase() === searchText.toLowerCase();
            });
        });
    }

    public static debug(element: ElementFinder) {
        element.getInnerHtml().then(
            (successVal) => {
                console.log('BasePage.debug success: ', successVal);
            },
            (failureVal) => {
                console.log('BasePage.debug failure: ', failureVal);
            }
        );
    }

    public static debugArray(elements: ElementArrayFinder) {
        console.log('debugArray - ');
        elements.each(TestUtils.debug);
    }

    /**
     * The given array is of promises.  Resolve those and return as an array of strings of the element.getText()
     * @param array
     * @return
     */
    public static getElementArrayAsList(array: ElementArrayFinder): promise.Promise<string[]> {
        let deferred = promise.defer();
        let out: string[] = new Array<string>();
        array.then((elements) => {
            elements.forEach((element: ElementFinder) => {
                element.getText().then(
                    (text: string) => {
                        if (text.length > 0) {
                            out.push(text);
                        }
                    }
                );
            });
        });
        deferred.fulfill(out);
        return deferred.promise;
    }

    public static getTimeStamp(): string {
        return moment().utc().format('@YYYYMMDDTHHmmss');
    }

    public static checkInputValueEqual(elemFinder: ElementFinder, elemName: string, expectValue: string | number) {
        elemFinder.getAttribute('value').then((value: string) => {
            if(typeof expectValue === 'number') {
                expect(value).toEqual(expectValue.toString());
                console.log('Check if ' + elemName + ' is "' + value + '": ' + (expectValue.toString() === value));
            } else {
                expect(value).toEqual(expectValue);
                console.log('Check if ' + elemName + ' is "' + value + '": ' + (expectValue === value));
            }
        });
    }

    public static async checkInputValueContainAsync(elemFinder: ElementFinder, elemName: string, expectValue: string) {
        let value: string = await elemFinder.getAttribute('value');
        console.log('Check if ' + elemName + ' "' + value + '" contains "' + expectValue + '": ' + (value.indexOf(expectValue) !== -1));
        expect(value).toContain(expectValue);
    }

    public static checkInputValueNotNull(elemFinder: ElementFinder, elemName: string) {
        elemFinder.getAttribute('value').then((value: string) => {
            console.log('Check if ' + elemName + ' is not null (value=' + value + ')');
            expect(value).not.toBeNull();
        });
    }

    public static checkItemCount(elemArrayFinder: ElementArrayFinder, action: string, expectCount: number) {
        elemArrayFinder.count().then((count: number) => {
            console.log('Number of items after ' + action + ': ' + count);
            expect(count).toBe(expectCount);
        });
    }

    public static async appendTimestampAsync(elemFinder: ElementFinder, timestamp: string) {
        let value: string = await elemFinder.getAttribute('value');
        if (value) {
            let index: number = value.indexOf('@');
            if(index > 0) {
                value = value.substring(0, index);
            }
        }
        await elemFinder.clear();
        await elemFinder.sendKeys(value + timestamp);
    }

    public static cacheInputValue(elemFinder: ElementFinder, fieldName: string, viewModel: any) {
        elemFinder.getAttribute('value').then((value: string) => {
            viewModel[fieldName] = value;
            console.log('Cache value for ' + fieldName + ': ' + value);
        });
    }

    public static changeInputValue(elemFinder: ElementFinder, fieldName: string, viewModel: any, backupModel?: any) {
        elemFinder.getAttribute('value').then((value: string) => {
            if (backupModel) {
                backupModel[fieldName] = value;
            }
            elemFinder.clear();
            elemFinder.sendKeys(viewModel[fieldName]);
            console.log('Change value for ' + fieldName + ' from "' + value + '" to "' + viewModel[fieldName] + '"');
        });
    }

    public static getOrdinalNumber(index: number): string {
        if (index % 10 === 1 && index !== 11) {
            return index + 'st';
        } else if (index % 10 === 2 && index !== 12) {
            return index + 'nd';
        } else if (index % 10 === 3 && index !== 13) {
            return index + 'rd';
        } else {
            return index + 'th';
        }
    }
}
