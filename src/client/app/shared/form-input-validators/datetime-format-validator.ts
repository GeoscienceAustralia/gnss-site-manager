import { FormControl, Validator } from '@angular/forms';
import * as moment from 'moment';

export const DATE_FORMAT: string = 'YYYY-MM-DD';
export const TIME_FORMAT: string = 'HH:mm:ss';

/**
 * A Validator class for checking the format of datetime input component.
 */
export class DatetimeFormatValidator implements Validator {

    private datetimeFormat: string;

    constructor(showTime: boolean = true) {
        this.datetimeFormat = DATE_FORMAT;
        if (showTime) {
            this.datetimeFormat += ' ' + TIME_FORMAT;
        }
    }

    validate(formControl: FormControl): { [key: string]: any } {
        let value: string = formControl.value;
        if (value && !moment(value, this.datetimeFormat, true).isValid()) {
            return {invalid_datetime_format: 'Invalid date (valid format: '
                    + this.datetimeFormat + ')'};
        }

        return null;
    }
}
