import { FormControl, Validator } from '@angular/forms';

const antennaRadomeTypePattern = /^[A-Z0-9\/._-]+( [A-Z0-9\/._-]+)* +[A-Z0-9]{4}$/;

/**
 * A Validator class for antenna and radome type input component.
 */
export class AntennaRadomeTypeValidator implements Validator {

    constructor(private codelist: string[]) { }

    validate(formControl: FormControl): {[key: string]: any} {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(antennaRadomeTypePattern);
            const warning = 'Unrecognised IGS antenna and radome type combination';
            if (matches && matches.length > 0) {
                const index = this.codelist.indexOf(value);
                return index >= 0 ? null : { invalid_antenna_radome_type : warning };
            } else {
                return { invalid_antenna_radome_type : warning };
            }
        }

        return null;
    }
}
