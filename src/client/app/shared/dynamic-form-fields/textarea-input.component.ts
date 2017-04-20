import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';

@Component({
    moduleId: module.id,
    selector: 'textarea-input',
    templateUrl: 'textarea-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaInputComponent),
            multi: true
        }
    ]
})
export class TextAreaInputComponent extends AbstractGnssControls implements ControlValueAccessor, OnInit {
    @Input() index: string = '0';
    @Input() name: string = '';
    @Input() public label: string = '';
    @Input() public required: boolean = false;
    @Input() public rows: string = '';
    @Input() public maxlength: string = '';
    // controlName & form needed for validation
    @Input() controlName: string;
    @Input() form: FormGroup;
    private _model: string = '';

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    ngOnInit() {
        this.checkPreConditions();
        super.setForm(this.form);
    }

    get model(): string {
        return this._model;
    }

    set model(value: string) {
        if (value !== undefined && value !== this._model) {
            this._model = value;
            this.propagateChange(value);
        }
    }

    writeValue(value: string) {
       if (value !== undefined && value !== this._model) {
           this.model = value;
       }
    }


    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    private checkPreConditions() {
        if (!this.controlName || this.controlName.length === 0) {
            console.error('TextAreaInputComponent - controlName Input is required');
        }
        if (!this.form) {
            console.error('TextAreaInputComponent - form Input is required');
        }
    }
}
