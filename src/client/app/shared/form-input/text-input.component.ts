import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'text-input',
    templateUrl: 'text-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextInputComponent),
        multi: true
    }]
})
export class TextInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;
    @Input() minLength: number = 0;
    @Input() maxLength: number = 200;

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.addValidatorsToFormControl();
    }

    public addValidatorsToFormControl() {
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }

        if (this.minLength) {
            validators.push(Validators.minLength(this.minLength));
        }
        if (this.maxLength) {
            validators.push(Validators.maxLength(this.maxLength));
        }

        setTimeout( () => {
            this.formControl.setValidators(validators);
        });
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    public getReadonlyAttribute(): string {
        return this.readonly;
    }
}
