import { FormControl, Validator } from '@angular/forms';
import * as moment from 'moment';

export const datetimeFormat: string = 'YYYY-MM-DD HH:mm:ss';

/**
 * A Validator class for checking if DateRemoved/EndDate is after DateInstalled/StartDate.
 */
export class DatetimeRangeValidator implements Validator {

    private dateFieldName1: string = '\"Date Installed\"';
    private dateFieldName2: string = '\"Date Removed\"';
    private otherDateControl: FormControl;
    private isValidatingEndDate: boolean;

    /**
     * Constructor
     *
     * @dateType: the type of datetime input component. Currently it supports two types:
     *            a) Installed-Removed for DateInstalled and DateRemoved pair;
     *            b) Start-End for StartDate and EndDate pair.
     * @otherDateControl: the Form Control of the other datetime input component
     * @isEndDate: boolean flag on whether it is validating on the End Date.
     *             If true, then the thisDate is DateRemoved/EndDate and the otherDate is DateInstalled/StartDate;
     *             If false, then the thisDate is DateInstalled/StartDate and the otherDate is DateRemoved/EndDate.
     */
    constructor(dateType: string, otherDateControl: FormControl, isEndDate: boolean) {
        if (dateType === 'Start-End') {
            this.dateFieldName1 = '\"Start Date\"';
            this.dateFieldName2 = '\"End Date\"';
        }
        this.otherDateControl = otherDateControl;
        this.isValidatingEndDate = isEndDate;
    }

    validate(thisDateControl: FormControl): { [key: string]: any } {
        let thisDateString: string = thisDateControl.value;
        let otherDateString: string = this.otherDateControl.value;
        if (!otherDateString || !thisDateString) {
            return null;
        } else {
            let thisDate = moment(thisDateString, datetimeFormat, true);
            let otherDate = moment(otherDateString, datetimeFormat, true);
            if (!thisDate.isValid()) {
                if (otherDate.isValid()) {
                    this.otherDateControl.setErrors(null);
                }
            } else if (!otherDate.isValid()) {
                return null;
            }

            this.otherDateControl.setErrors(null);
            if (this.isValidatingEndDate) {
                if (thisDate.isSameOrBefore(otherDate)) {
                    return {invalid_datetime_format: this.dateFieldName2 + ' must be after ' + this.dateFieldName1};
                }
            } else {
                if (thisDate.isSameOrAfter(otherDate)) {
                    return {invalid_datetime_format: this.dateFieldName1 + ' must be before ' + this.dateFieldName2};
                }
            }
        }

        return null;
    }
}
