import * as lodash from 'lodash';
import * as moment from 'moment-timezone';

export class MiscUtils {
    private static scrollToView: any = require('scroll-into-view');

    /**
     * Get UTC date and time string in format of "yyyy-mm-dd hh:mm:ss"
     */
    public static getUTCDateTime(): string {
        return moment().utc().format('YYYY-MM-DD hh:mm:ss');
    }

    public static prettyFormatDateTime(date: string) {
        let regex = new RegExp('([^T]*)T([^\.]*)\.(.*)');  // date'T'time.ms
        let groups: RegExpExecArray;
        if ((groups = regex.exec(date)) && groups.length >= 3) {
            return groups[1] + ' ' + groups[2];
        } else {
            throw new Error('prettyFormatDateTime - cant parse date \'' + date + '\'');
        }
    }

    /**
     * Returns the date string (YYYY-MM-DD) from the date-time string (YYYY-MM-DDThh:mm:ssZ)
     */
    public static getDateComponent(datetime: string): string {
        if (datetime === null || typeof datetime === 'undefined') {
            return '';
        } else if (datetime.length < 10) {
            return datetime;
        }
        return datetime.substring(0, 10);
    }

    public static formatDateToDateString(date: Date): string {
        if (! MiscUtils.isDate(date)) {
            throw new Error(`Input isnt a date - type: ${typeof date}, value: ${date}`);
        }
        let dateStr: string = date.getFullYear() + '-'
            + MiscUtils.padTwo(date.getMonth() + 1) + '-'
            + MiscUtils.padTwo(date.getDate());
        return dateStr;
    }
    /**
     * Return a date as a string in the "YYYY-MM-DD'T'hh:mm:ss.000Z" format.
     *
     * @param date
     * @return {string}
     */
    public static formatDateToDatetimeString(date: Date): string {
        if (! MiscUtils.isDate(date)) {
            throw new Error(`Input isnt a date - type: ${typeof date}, value: ${date}`);
        }
        let dateStr: string = MiscUtils.formatDateToDateString(date);

        let timeStr: string = this.padTwo(date.getHours()) + ':'
            + MiscUtils.padTwo(date.getMinutes()) + ':'
            + MiscUtils.padTwo(date.getSeconds());

        let dateTime: string = dateStr + 'T' + timeStr + '.000Z';

        return dateTime;
    }

    public static isDate(date: Date): boolean {
        if (Object.prototype.toString.call(date) === '[object Date]') {
            return ! isNaN(date.getTime());
        } else {
            return false;
        }
    }

    /**
     * Convert an integer to a two-character string.
     */
    public static padTwo(index: number): string {
        if (index < 10) {
            return '0' + index.toString();
        }
        return index.toString();
    }

    /**
     * Clone a JSON object from existing one so that both have no reference
     */
    public static cloneJsonObj(obj: any): any {
        return lodash.cloneDeep(obj);
    }

    /**
     * Return the type of the object obj
     */
    public static getObjectType(obj: any): string {
        if (typeof obj === 'undefined') {
            return 'undefined';
        } else if (obj === null) {
            return null;
        }
        return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
    }

    /**
     * Scroll the element clicked into full-view on the page and return a flag for switching block open/hide option.
     */
    public static scrollIntoView(event: any, isBlockOpen: boolean): boolean {
        isBlockOpen = !isBlockOpen;
        if (isBlockOpen && event && event.target) {
            this.smoothScrollTo(event.target);
        }

        return isBlockOpen;
    }

    /**
     * Scroll the element clicked into full-view on the page.
     */
    public static showFullView(event: UIEvent) {
        event.preventDefault();
        if (event && event.target) {
            this.smoothScrollTo(event.target);
        }
    }

    /**
     * Scroll the element defined by Id into full-view on the page.
     */
    public static showElemById(id: string) {
        let elem: any = document.getElementById(id);
        if (elem !== null) {
            this.smoothScrollTo(elem);
        }
    }

    /**
     * Smoothly scroll the element elem into full-view on the page for FF, Chrome, Opera and Safari. Note that it dose not
     * work in IE at all, so we have to use scrollIntoView() function instead (not smooth).
     */
    public static smoothScrollTo(elem: any): void {
        if (elem === null) {
            return;
        } else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!navigator.userAgent.match(/Trident\/7\./)) {
            setTimeout(function () {
                elem.scrollIntoView({behavior: 'smooth'});
            }, 500);
        } else {
            let settings: any = {time: 1000, align: {top: 0, left: 0}};
            this.scrollToView(elem, settings);
        }
    }
}
