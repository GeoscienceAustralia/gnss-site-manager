import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';
import { DatetimeFormatValidator } from '../form-input-validators/datetime-format-validator';
import { DatetimeRangeValidator } from '../form-input-validators/datetime-range-validator';
import { MiscUtils } from '../index';

/**
 * This class represents the Datetime Input Component for choosing dates.
 */
@Component({
    moduleId: module.id,
    selector: 'datetime-input',
    templateUrl: 'datetime-input.component.html',
    styleUrls: ['datetime-input.component.css']
})
export class DatetimeInputComponent extends AbstractInput implements OnInit {

    @Input()
    dateType: string = 'Installed-Removed';

    public datetimeModel: Date;
    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;
    public datetimeLength: number = 19;
    public dtPickerHeight: number = 380;
    public showDatetimePicker: boolean = false;

    private datetimeRegExp: RegExp;

    constructor(private elemRef: ElementRef) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.datetimeRegExp = /\d{2,4}-\d\d-\d\d(T| )\d\d:\d\d:\d\d/g;
        this.updateDatetimePicker();
        this.addValidatorsToFormControl();
    }

    public addValidatorsToFormControl() {
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }

        validators.push(new DatetimeFormatValidator());
        if (this.controlName === 'endDate') {
            let startDateControl: FormControl = <FormControl>this.form.controls.startDate;
            validators.push(new DatetimeRangeValidator(this.dateType, startDateControl, true));
        } else if (this.controlName === 'startDate') {
            let endDateControl: FormControl = <FormControl>this.form.controls.endDate;
            validators.push(new DatetimeRangeValidator(this.dateType, endDateControl, false));
        }

        setTimeout( () => {
            this.formControl.setValidators(validators);
        });
    }

    public isFormDisabled(): boolean {
        return this.form.disabled;
    }

   /**
    * Close the datetime picker if mouse clicks outside of it
    */
    @HostListener('document:click', ['$event'])
    public handleClickOutside(event: any) {
        if (this.showDatetimePicker) {
            event.preventDefault();
            let clickedComponent: any = event.target;
            let isInside: boolean = false;
            do {
                if (clickedComponent === this.elemRef.nativeElement) {
                    isInside = true;
                    break;
                } else if (clickedComponent.id && clickedComponent.id.startsWith('datepicker')) {
                    isInside = true;
                    break;
                } else if (clickedComponent.type && clickedComponent.type === 'button'
                && clickedComponent.tabIndex && clickedComponent.tabIndex === -1) {
                    isInside = true;
                    break;
                }
                clickedComponent = clickedComponent.parentNode;
            } while (clickedComponent);

            this.showDatetimePicker = isInside;
        }
    }

   /**
    * Close the datetime picker
    */
    public close(): void {
        this.showDatetimePicker = false;
    }

   /**
    * Update the value of the datetime input box
    */
    public updateDatetimeInput(date: Date = null): void {
        if (!date) {
            return;
        }
        date.setHours(this.hours);
        date.setMinutes(this.minutes);
        date.setSeconds(this.seconds);
        let datetimeString: string = this.convertDateToString(date);
        this.formControl.setValue(datetimeString);
        this.formControl.markAsDirty();
    }

   /**
    * Update the datetime picker in response to direct changes made in the input box
    */
    public updateDatetimePicker(): void {
        let datetimeObject = this.convertStringToDate(this.formControl.value);
        if (!datetimeObject) {
            return;
        }

        this.datetimeModel = datetimeObject;
        this.hours = this.datetimeModel.getHours();
        this.minutes = this.datetimeModel.getMinutes();
        this.seconds = this.datetimeModel.getSeconds();
        let datetimeString = this.convertDateToString(this.datetimeModel);
        this.formControl.setValue(datetimeString);
    }

    public modifyHours(): void {
        if (this.hours !== null && this.hours >= 0 && this.hours < 24) {
            this.updateDatetimeInput(this.datetimeModel);
        }
    }

    public modifyMinutes(): void {
        if (this.minutes !== null && this.minutes >= 0 && this.minutes < 60) {
            this.updateDatetimeInput(this.datetimeModel);
        }
    }

    public modifySeconds(): void {
        if (this.seconds !== null && this.seconds >= 0 && this.seconds < 60) {
            this.updateDatetimeInput(this.datetimeModel);
        }
    }

    public updateHoursByStep(increment: boolean): void {
        this.hours = increment ? this.hours + 1 : this.hours - 1;
        this.hours = (this.hours + 24) % 24;
        this.updateDatetimeInput(this.datetimeModel);
    }

    public updateMinutesByStep(increment: boolean): void {
        this.minutes = increment ? this.minutes + 1 : this.minutes - 1;
        if (this.minutes > 59) {
            this.minutes = 0;
            this.updateHoursByStep(increment);
        } else if (this.minutes < 0) {
            this.minutes = 59;
            this.updateHoursByStep(increment);
        }
        this.updateDatetimeInput(this.datetimeModel);
    }

    public updateSecondsByStep(increment: boolean): void {
        this.seconds = increment ? this.seconds + 1 : this.seconds - 1;
        if (this.seconds > 59) {
            this.seconds = 0;
            this.updateMinutesByStep(increment);
        } else if (this.seconds < 0) {
            this.seconds = 59;
            this.updateMinutesByStep(increment);
        }
        this.updateDatetimeInput(this.datetimeModel);
    }

   /**
    * Convert a string in format of 'YYYY-MM-DD[THH:mm:ss.sssZ]' to a Date object.
    */
    private convertStringToDate(dtStr: string): Date {
        if (!dtStr || dtStr.trim().length < this.datetimeLength) {
            return null;
        }
        let datetimeDisplay: string = dtStr.replace('T', ' ').replace('Z', '');
        datetimeDisplay = datetimeDisplay.replace(/\.\d\d\d/, '');
        if (!datetimeDisplay.match(this.datetimeRegExp)) {
            return null;
        }
        return new Date(datetimeDisplay);
    }

   /**
    * Convert a Date object to a string in format of 'YYYY-MM-DD[THH:mm:ss]'.
    */
    private convertDateToString(date: Date): string {
        if (!date) {
            return null;
        }

        let dateStr: string = date.getFullYear() + '-'
            + MiscUtils.padTwo(date.getMonth() + 1) + '-'
            + MiscUtils.padTwo(date.getDate());
        let timeStr: string = MiscUtils.padTwo(date.getHours()) + ':'
            + MiscUtils.padTwo(date.getMinutes()) + ':'
            + MiscUtils.padTwo(date.getSeconds());
        return  dateStr + ' ' + timeStr;
    }
}
