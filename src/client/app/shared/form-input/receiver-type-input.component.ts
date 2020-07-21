import { Component, Input, EventEmitter, Output, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'receiver-type-input',
    templateUrl: 'receiver-type-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ReceiverTypeInputComponent),
        multi: true
    }]
})
export class ReceiverTypeInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;
    @Input() allReceiverCodes: string[];
    @Output() receiverTypeChange: EventEmitter<any> = new EventEmitter<any>();

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    /**
    * Creates a new ReceiverTypeInputComponent with the injected Http.
    * @constructor
    */
    constructor() {
        super();
    }

    /**
     * Fetch IGS Receiver Code list from GeodesyMLCodelistService
     */
    ngOnInit() {
        super.ngOnInit();
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    getReadonlyAttribute(): string {
        return this.readonly;
    }

    onKeyUp(event: any) {
        event.value = event.currentTarget.value;
        this.receiverTypeChange.emit(event);
    }

    onSelect(event: any) {
        this.receiverTypeChange.emit(event);
    }
}
