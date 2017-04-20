import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class AbstractGnssControls {
    private superForm: FormGroup;

    protected setForm(form: FormGroup) {
        this.superForm = form;
    }

    protected getErrorReport(controlId: string) {
        let errString: string = '';
        let control: AbstractControl;
        // Force an error as this field should have been set
        control = this.superForm.controls[controlId];
        if (! control) {
            console.warn('Control "'+controlId+'" doesnt exist on form.');
            return errString;
        }
        //console.log('error reprot - control: ', controlId);
        if (control.errors) {
            for (let e of Object.keys(control.errors)) {
                console.log(e + ' -> ', control.errors[e]);
                errString += e;
                errString += ': ';
                errString += JSON.stringify(control.errors[e]);
            }
        }
        // if (errString.length > 0) {
        //     console.log('getErrorReport for "' + controlId + '": -> ' + errString);
        //     console.log('getErrorReport control: ', control);
        // }
        return errString;
    }
}
