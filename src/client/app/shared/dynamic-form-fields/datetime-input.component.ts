import { Component, ElementRef, HostListener, Input, OnInit, DoCheck } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';
import { MiscUtils } from '../index';

const validDatetimeFormat: RegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1]) ([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/g;

/**
 * This class represents the Datetime Input Component for choosing dates.
 */
@Component({
    moduleId: module.id,
    selector: 'datetime-input',
    templateUrl: 'datetime-input.component.html',
    styleUrls: ['datetime-input.component.css']
})
export class DatetimeInputComponent extends AbstractGnssControls implements OnInit, DoCheck {
    public miscUtils: any = MiscUtils;
    public datetimeModel: Date;
    public hoursString: string = '00';
    public minutesString: string = '00';
    public secondsString: string = '00';
    public invalidHours: boolean = false;
    public invalidMinutes: boolean = false;
    public invalidSeconds: boolean = false;
    public invalidDatetime: boolean = false;
    public showDatetimePicker: boolean = false;

    public datetime: string = '';
    public formControl: AbstractControl;
    @Input() public form: FormGroup;
    @Input() public controlName: string;
    @Input() public required: boolean = true;
    @Input() public label: string = '';

    private hours: number = 0;
    private minutes: number = 0;
    private seconds: number = 0;
    private datetimeSuffix: string = '.000Z';
    private datetimeLast: string = '';

    constructor(private elemRef: ElementRef) {
        super();
    }

   /**
    * Initialize relevant variables when the directive is instantiated
    */
    ngOnInit() {
        super.setForm(this.form);
        this.formControl = this.form.controls[this.controlName];
        this.updateCalendar();
        this.formControl.setValue(this.datetime);
        this.datetimeLast = '';
    }

   /**
    * Validate datetime value changed externally by manual typing.
    #
    * Note: it won't be invalid if it is selected by the calendar dialog
    */
    ngDoCheck(): void {
        if (this.datetimeLast !== this.datetime) {
            this.datetimeLast = this.datetime;
            this.validateDatetime();
        }
    }

    public isFormDisabled(): boolean {
        return this.form.disabled;
    }

   /**
    * Close the calendar if mouse clicks outside of it
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
    * Set the selected datetime value to the datetime model when users click on the OK button
    */
    public setSelectedDatetime(): void {
        if (this.invalidHours || this.invalidMinutes || this.invalidSeconds) {
            return;
        }

        this.showDatetimePicker = false;
        this.invalidDatetime = false;
        this.datetimeModel.setHours(this.hours);
        this.datetimeModel.setMinutes(this.minutes);
        this.datetimeModel.setSeconds(this.seconds);
        this.setOutputDatetime();
    }

   /**
    * Cancel the selected datetime value and close the popup
    */
    public cancelSelectedDatetime(event: any): void {
        this.updateCalendar();
        this.showDatetimePicker = false;
    }

   /**
    * Update the datetime model when users select a date on calendar
    */
    public updateDate(event: any): void {
        this.datetimeModel = event;
        this.invalidDatetime = false;
    }

   /**
    * Update the calendar and datetime model in response to direct changes made in the input box
    */
    public updateCalendar(): void {
        this.datetime = this.formatDatetimeToDisplay(this.formControl.value);
        let newDate: Date = this.convertStringToDate(this.datetime);
        if (newDate === null) {
            this.datetimeModel = new Date();
        } else {
            this.datetimeModel = newDate;
        }
        this.hours = this.datetimeModel.getHours();
        this.minutes = this.datetimeModel.getMinutes();
        this.seconds = this.datetimeModel.getSeconds();
        this.updateTimeStrings();
    }

    public updateHours(): void {
        this.hours = this.toInteger(this.hoursString, 0, 23);
        if (this.hours === null) {
            this.invalidHours = true;
            this.hours = 0;
        } else {
            this.invalidHours = false;
            this.updateTimeStrings();
        }
    }

    public updateMinutes(): void {
        this.minutes = this.toInteger(this.minutesString, 0, 59);
        if (this.minutes === null) {
            this.invalidMinutes = true;
            this.minutes = 0;
        } else {
            this.invalidMinutes = false;
            this.updateTimeStrings();
        }
    }

    public updateSeconds(): void {
        this.seconds = this.toInteger(this.secondsString, 0, 59);
        if (this.seconds === null) {
            this.invalidSeconds = true;
            this.seconds = 0;
        } else {
            this.invalidSeconds = false;
            this.updateTimeStrings();
        }
    }

    public incrementHours(): void {
        this.hours += 1;
        if (this.hours > 23) {
            this.hours = 0;
        } else if (this.hours < 0) {
            this.hours = 23;
        }
        this.invalidHours = false;
        this.updateTimeStrings();
    }

    public decrementHours(): void {
        this.hours -= 1;
        if (this.hours > 23) {
            this.hours = 0;
        } else if (this.hours < 0) {
            this.hours = 23;
        }
        this.invalidHours = false;
        this.updateTimeStrings();
    }

    public incrementMinutes(): void {
        this.minutes += 1;
        if (this.minutes > 59) {
            this.minutes = 0;
            this.incrementHours();
        } else if (this.minutes < 0) {
            this.minutes = 59;
            this.decrementHours();
        }
        this.invalidMinutes = false;
        this.updateTimeStrings();
    }

    public decrementMinutes(): void {
        this.minutes -= 1;
        if (this.minutes > 59) {
            this.minutes = 0;
            this.incrementHours();
        } else if (this.minutes < 0) {
            this.minutes = 59;
            this.decrementHours();
        }
        this.invalidMinutes = false;
        this.updateTimeStrings();
    }

    public incrementSeconds(): void {
        this.seconds += 1;
        if (this.seconds > 59) {
            this.seconds = 0;
            this.incrementMinutes();
        } else if (this.seconds < 0) {
            this.seconds = 59;
            this.decrementMinutes();
        }
        this.invalidSeconds = false;
        this.updateTimeStrings();
    }

    public decrementSeconds(): void {
        this.seconds -= 1;
        if (this.seconds > 59) {
            this.seconds = 0;
            this.incrementMinutes();
        } else if (this.seconds < 0) {
            this.seconds = 59;
            this.decrementMinutes();
        }
        this.invalidSeconds = false;
        this.updateTimeStrings();
    }

    public validateDatetime(): void {
        if (this.datetime === null || this.datetime.trim().length === 0) {
            this.invalidDatetime = this.required ? true : false;
        } else if (this.datetime.length < 19) {
            this.invalidDatetime = true;
        } else {
            if (this.datetime
                .match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1]) ([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/g)) {
                this.invalidDatetime = false;
            } else {
                this.invalidDatetime = true;
            }
        }
    }

   /**
    * Get a validation message to apply if the input string is:
    *   1. required but not supplied, or
    *   2. supplied but not a valid date
    */
    public getValidationMessage() {
        let message = this.label + ' is ';
        if (this.required && !this.datetime) {
            message += ' required ';
        } else if (this.invalidDatetime) {
            message += ' not valid ';
        }
        message += '(Valid Date Format: YYYY-MM-DD hh:mm:ss)';
        return message;
    }

   /**
    * Update hour/minute/second time strings in response to any changes in hours, minutes, and seconds.
    */
    private updateTimeStrings() {
        this.hoursString = MiscUtils.padTwo(this.hours);
        this.minutesString = MiscUtils.padTwo(this.minutes);
        this.secondsString = MiscUtils.padTwo(this.seconds);
    }

   /**
    * Convert a string in format of 'YYYY-MM-DDThh:mm:ss.sssZ' to a Date object.
    */
    private convertStringToDate(dtStr: string): Date {
        if (dtStr === null || dtStr.trim().length === 0) {
            this.invalidDatetime = this.required ? true : false;
            return null;
        } else if (dtStr.trim().length < 19) {
            this.invalidDatetime = true;
            return null;
        }

        try {
            let date: Date = new Date(dtStr.substring(0, 19).replace(' ', 'T'));
            if (date !== null && date.toString() !== 'Invalid Date') {
                this.invalidDatetime = false;
                return date;
            }
        } catch(error) {
            console.log('Error:'+error);
        }

        this.invalidDatetime = true;
        return null;
    }

    private formatDatetimeToDisplay(datetimeStr: string): string {
        if (datetimeStr) {
            let datetimeDisplay: string = datetimeStr.replace('T', ' ');
            return datetimeDisplay.replace(/\.\d\d\dZ/, ''); // remove '.000Z'
        }
        return datetimeStr;
    }

   /**
    * Set a string in format of 'YYYY-MM-DDThh:mm:ss.sssZ' back to the input JSON object.
    */
    private setOutputDatetime(): void {
        if (this.datetimeModel === null) {
            return;
        }

        let dateStr: string = this.datetimeModel.getFullYear() + '-'
            + MiscUtils.padTwo(this.datetimeModel.getMonth() + 1) + '-'
            + MiscUtils.padTwo(this.datetimeModel.getDate());
        let timeStr: string = MiscUtils.padTwo(this.datetimeModel.getHours()) + ':'
            + MiscUtils.padTwo(this.datetimeModel.getMinutes()) + ':'
            + MiscUtils.padTwo(this.datetimeModel.getSeconds());

        this.datetime = dateStr + ' ' + timeStr;// + this.datetimeSuffix;
        this.formControl.setValue(this.datetime);
        if (this.datetime !== this.datetimeLast) {
            this.formControl.markAsDirty();
            this.datetimeLast = this.datetime;
        }
    }

   /**
    * Returns an integer between min and max values by parsing from input str,
    * return null if it is not a number or out of range.
    */
    private toInteger(str: string, min: number, max: number): number {
        try {
            let num: number = parseInt(str, 10);
            if (isNaN(num)) {
                return null;
            } else if (num < min || num > max) {
                return null;
            } else {
                return num;
            }
        } catch(error) {
            return null;
        }
    }
}
