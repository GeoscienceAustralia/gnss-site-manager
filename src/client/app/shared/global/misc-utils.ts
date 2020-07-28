import * as lodash from 'lodash';
import * as moment from 'moment';

export class MiscUtils {

    /**
     * Get UTC date and time string in format of "yyyy-mm-dd HH:mm:ss"
     */
    public static getUTCDateTime(): string {
        return moment().utc().format('YYYY-MM-DD HH:mm:ss');
    }

    public static formatUTCDateTime(date: string): string {
        return moment.utc(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }

    public static formatDateTimeSimple(date: string): string {
        return moment.utc(date).format('YYYY-MM-DD HH:mm:ss');
    }

    public static formatDateTimeString(date: string): string {
        return moment.utc(date).format('YYYYMMDDTHHmmss');
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
     * Returns the date string (YYYY-MM-DD) from the date-time string (YYYY-MM-DDTHH:mm:ssZ)
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
        if (!MiscUtils.isDate(date)) {
            throw new Error(`Input isnt a date - type: ${typeof date}, value: ${date}`);
        }
        let dateStr: string = date.getFullYear() + '-'
            + MiscUtils.padTwo(date.getMonth() + 1) + '-'
            + MiscUtils.padTwo(date.getDate());
        return dateStr;
    }

    /**
     * Return a date as a string in the "YYYY-MM-DD'T'HH:mm:ss.000Z" format.
     *
     * @param date
     * @return {string}
     */
    public static formatDateToDatetimeString(date: Date): string {
        if (!MiscUtils.isDate(date)) {
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
            return !isNaN(date.getTime());
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

    public static isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    public static stringToNumber(numStr: string): number {
        if (typeof numStr === 'number') {
            return numStr;
        }
        if (numStr && typeof numStr === 'string' && numStr.match(/\d+/)) {
            return parseInt(numStr);
        } else {
            if (numStr) {
                console.error('Not a number: ', numStr);
            }
            return null;
        }
    }
}
