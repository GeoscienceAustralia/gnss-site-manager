import { FormControl, Validator } from '@angular/forms';
import * as moment from 'moment';

export const datetimeFormat: string = 'YYYY-MM-DD HH:mm:ss';

/**
 * Validate if EndDate is after StartDate. This validation class is only applied to DateRemoved / EndDate input component.
 *
 * @otherDateControl: the FormControl of other datetime
 * @isValidatingEndDate: boolean flag on whether it is validating on the End Datetime.
 *                       If true, then the thisDate is End Datetime and the otherDate is Start Datetime;
 *                       If false, then the thisDate is Start Datetime and the otherDate is End Datetime.
 */
export class DatetimeRangeValidator implements Validator {

    private otherDateControl: FormControl;
    private isValidatingEndDate: boolean = true;

    constructor(otherDateControl: FormControl, isEndDate: boolean) {
        this.otherDateControl = otherDateControl;
        this.isValidatingEndDate = isEndDate;
    }

    validate(thisDateControl: FormControl): { [key: string]: any } {
        let otherDateString: string = this.otherDateControl.value;
        let thisDateString: string = thisDateControl.value;
        if (!otherDateString || !thisDateString) {
            return null;
        } else {
            let otherDate = moment(otherDateString, datetimeFormat, true);
            let thisDate = moment(thisDateString, datetimeFormat, true);
            if (!thisDate.isValid()) {
                if (otherDate.isValid()) {
                    this.otherDateControl.setErrors(null);
                }
                return {invalid_datetime_format: 'Invalid date (valid format: ' + datetimeFormat + ')'};
            } else if (!otherDate.isValid()) {
                return null;
            }

            this.otherDateControl.setErrors(null);
            if (this.isValidatingEndDate) {
                if (thisDate.isSameOrBefore(otherDate)) {
                    return {invalid_datetime_format: 'Date Removed/End must be after Date Installed/Start'};
                }
            } else {
                if (thisDate.isSameOrAfter(otherDate)) {
                    return {invalid_datetime_format: 'Date Installed/Start must be before Date Removed/End'};
                }
            }
        }

        return null;
    }
}
