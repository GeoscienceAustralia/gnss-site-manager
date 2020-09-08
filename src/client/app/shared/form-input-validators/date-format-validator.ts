import { FormControl, Validator } from '@angular/forms';
import * as moment from 'moment';

export const dateFormat: string = 'YYYY-MM-DD';

/**
 * A Validator class for checking the format of date input component.
 */
export class DateFormatValidator implements Validator {

    constructor() { }

    validate(formControl: FormControl): { [key: string]: any } {
        let value: string = formControl.value;
        if (value && !moment(value, dateFormat, true).isValid()) {
            return {invalid_datetime_format: 'Invalid date (valid format: ' + dateFormat + ')'};
        }

        return null;
    }
}
