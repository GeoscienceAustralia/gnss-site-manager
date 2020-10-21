import { FormControl, Validator } from '@angular/forms';

const radomeTypePattern = /^[A-Z0-9]{4}$/;

/**
 * A Validator class for radome type input component.
 */
export class RadomeTypeValidator implements Validator {

    constructor(private codelist: string[]) { }

    validate(formControl: FormControl): { [key: string]: any } {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(radomeTypePattern);
            const warning = 'Unrecognised IGS radome type';
            if (matches && matches.length > 0) {
                const index = this.codelist.indexOf(value);
                return index >= 0 ? null : { invalid_radome_type : warning };
            } else {
                return { invalid_radome_type : warning };
            }
        }

        return null;
    }
}
