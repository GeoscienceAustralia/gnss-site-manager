import { Component, Input, Output, EventEmitter, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';

@Component({
    moduleId: module.id,
    selector: 'number-input',
    templateUrl: 'number-input.component.html',
    styleUrls: ['form-input.component.css'],
        providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NumberInputComponent),
        multi: true
    }]
})
export class NumberInputComponent extends AbstractGnssControls implements ControlValueAccessor, OnInit {
    @Input() index: string = '0';
    @Input() name: string = '';
    @Input() public label: string = '';
    @Input() public required: boolean = false;
    @Input() public step: string = '';
    @Input() public min: string = '';
    @Input() public maxlength: string = '';
    // controlName & form needed for validation
    @Input() controlName: string;
    @Input() form: FormGroup;

    private _value: string = '';

    ngOnInit() {
        if (!this.controlName || this.controlName.length === 0) {
            console.error('TextAreaInputComponent - controlName Input is required');
        }
        if (!this.form) {
            console.error('TextAreaInputComponent - form Input is required');
        }
        super.setForm(this.form);
    }

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        if (value !== undefined && value !== this._value) {
            this._value = value;
            this.propagateChange(value);
        }
    }

    writeValue(value: string) {
        if (value !== undefined && value !== this.value) {
            this.value = value;
        }
    }


    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }
}
