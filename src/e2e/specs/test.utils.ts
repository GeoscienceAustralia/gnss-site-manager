import { ElementArrayFinder, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

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
        array.each((element: ElementFinder) => {
            element.getText().then(
                (text: string) => {
                    out.push(text);
                }
            );
        });
        deferred.fulfill(out);
        return deferred.promise;
    }
}
