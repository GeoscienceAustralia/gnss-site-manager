import { FormControl, Validator } from '@angular/forms';

const receiverTypePattern = /^[A-Z0-9._-]+( [A-Z0-9._-]+)*$/;

/**
 * A Validator class for receiver type input component.
 */
export class ReceiverTypeValidator implements Validator {

    constructor(private codelist: string[]) { }

    validate(formControl: FormControl): { [key: string]: any } {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(receiverTypePattern);
            const warning = 'Unrecognised IGS receiver type';
            if (matches && matches.length > 0) {
                const index = this.codelist.indexOf(value);
                return index >= 0 ? null : { invalid_receiver_type : warning };
            } else {
                return { invalid_receiver_type : warning };
            }
        }

        return null;
    }
}
