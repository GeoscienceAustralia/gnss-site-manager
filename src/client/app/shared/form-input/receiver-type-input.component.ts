import { ReceiverAntennaCodeService } from '../receiver-antenna-code/receiver-antenna-code.service';
import { Component, Input, forwardRef, OnInit } from '@angular/core';
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

    allReceiverCodes : string[] = [];

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    /**
    * Creates a new ReceiverTypeInputComponent with the injected Http.
    * @param receiverAntennaCodeService - Service for fetching XML and converting to IGS Receiver Code
    * @constructor
    */
    constructor(private receiverAntennaCodeService: ReceiverAntennaCodeService) {
        super();
    }

    /**
     * Fetch IGS Receiver Code list from ReceiverAntennaCodeService
     */
    ngOnInit() {
        super.ngOnInit();
        this.allReceiverCodes = this.receiverAntennaCodeService.receiverCodes();
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
