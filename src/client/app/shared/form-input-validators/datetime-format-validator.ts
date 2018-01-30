import { FormControl, Validator } from '@angular/forms';
import * as moment from 'moment';

export const datetimeFormat: string = 'YYYY-MM-DD HH:mm:ss';

export class DatetimeFormatValidator implements Validator {

    constructor() { }

    validate(formControl: FormControl): { [key: string]: any } {
        let value: string = formControl.value;
        if (value && !moment(value, datetimeFormat, true).isValid()) {
            return {invalid_datetime_format: 'Invalid date (valid format: ' + datetimeFormat + ')'};
        }

        return null;
    }
}
