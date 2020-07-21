import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'typeahead-input',
    templateUrl: 'typeahead-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TypeaheadInputComponent),
        multi: true
    }]
})
export class TypeaheadInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() codelist: string[] = [];
    @Input() placeholder: string = null;
    @Output() typeChangeEvent: EventEmitter<any> = new EventEmitter<any>();

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    constructor() {
        super();
    }

    writeValue(value: string) { }

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    onSelect(event: any) {
        this.typeChangeEvent.emit(event.value);
    }

    onKeyUp(event: any) {
        this.typeChangeEvent.emit(event.currentTarget.value);
    }
}
