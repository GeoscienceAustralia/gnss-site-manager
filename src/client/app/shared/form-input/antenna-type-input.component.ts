import { Component, Input, EventEmitter, Output, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'antenna-type-input',
    templateUrl: 'antenna-type-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AntennaTypeInputComponent),
        multi: true
    }]
})
export class AntennaTypeInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;
    @Input() allAntennaCodes: string[];
    @Output() antennaRadomeTypeChange: EventEmitter<any> = new EventEmitter<any>();

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    /**
    * Creates a new AntennaTypeInputComponent with the injected Http.
    * @constructor
    */
    constructor() {
        super();
    }

    /**
     * Fetch IGS Antenna Code list from GeodesyMLCodelistService
     */
    ngOnInit() {
        super.ngOnInit();
    }

    writeValue(value: string) { }

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
        this.antennaRadomeTypeChange.emit(event);
    }

    onSelect(event: any) {
        this.antennaRadomeTypeChange.emit(event);
    }
}
