import { ReceiverAntennaCodeService } from './../receiver-antenna-code/receiver-antenna-code.service';
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'antenna-input',
    templateUrl: 'antenna-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AntennaInputComponent),
        multi: true
    }]
})
export class AntennaInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;
    @Input() maxlength: number = 10000;

    allAntennaCodes : string[] = [];

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    /**
    * Creates a new AntennaInputComponent with the injected Http.
    * @param {Http} http - The injected Http.
    * @param receiverAntennaCodeService - Service for fetching XML and converting to IGS Receiver Code
    * @constructor
    */
    constructor(private receiverAntennaCodeService: ReceiverAntennaCodeService) {
        super();
    }

    /**
     * Fetch IGS Antenna Code list from ReceiverAntennaCodeService
     */
    ngOnInit() {
        super.ngOnInit();
        this.allAntennaCodes = this.receiverAntennaCodeService.antennaCodes();
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
