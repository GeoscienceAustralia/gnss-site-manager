import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';

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
export class TextInputComponent extends AbstractGnssControls implements ControlValueAccessor, OnInit {
    @Input() index: string = '0';
    @Input() name: string = '';
    @Input() label: string = '';
    @Input() public readonly: string = '';

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    ngOnInit() {
        this.checkPreConditions();
        super.setForm(this.form);
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    private checkPreConditions() {
        if (!this.controlName || this.controlName.length === 0) {
            console.error('TextInputComponent - controlName Input is required');
        }
        if (!this.form) {
            console.error('TextInputComponent - form Input is required');
        }
    }

}
