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

    @Input()
    showTime: boolean = true;

    public dateModel: Date;
    public timeModel: Date;
    public datetimeLength: number;
    public showDatetimePicker: boolean = false;

    private datetimeRegExp: RegExp;

    constructor(private elemRef: ElementRef) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.showTime) {
            this.datetimeLength = 19;
            this.datetimeRegExp = /\d{4}-\d\d-\d\d(T| )\d\d:\d\d:\d\d/g;
        } else {
            this.datetimeLength = 10;
            this.datetimeRegExp = /\d{4}-\d\d-\d\d/g;
        }
        this.updateDatetimePicker();
        this.addValidatorsToFormControl();
    }

    public addValidatorsToFormControl() {
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }

        validators.push(new DatetimeFormatValidator(this.showTime));
        if (this.showTime) {
            if (this.controlName === 'endDate') {
                let startDateControl: FormControl = <FormControl>this.form.controls.startDate;
                validators.push(new DatetimeRangeValidator(this.dateType, startDateControl, true));
            } else if (this.controlName === 'startDate') {
                let endDateControl: FormControl = <FormControl>this.form.controls.endDate;
                validators.push(new DatetimeRangeValidator(this.dateType, endDateControl, false));
            }
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
     * Toggle on/off the datetime picker
     */
     public toggleDatetimePicker(): void {
         this.showDatetimePicker = !this.showDatetimePicker;
     }

   /**
    * Close the datetime picker
    */
    public close(): void {
        this.showDatetimePicker = false;
    }

   /**
    * Hide datepicker in response to a date selectionDone event
    */
    public onDateSelectionDone(dateObject: Date = null): void {
        if (!dateObject) {
            return;
        } else if (!this.showTime) {
            this.showDatetimePicker = false;
        }
    }

    /**
     * Update the value of the date input box in response to modelChange event
     */
     public updateDateInput(dateObject: Date = null): void {
         if (!dateObject) {
             return;
         }
 
         this.dateModel = dateObject;
         this.formControl.setValue(this.convertDateToString());
         this.formControl.markAsDirty();
     }

    /**
     * Update the value of the time input box in response to modelChange event
     */
    public updateTimeInput(timeObject: Date = null): void {
        if (!timeObject) {
            return;
        }

        this.timeModel = timeObject;
        this.formControl.setValue(this.convertDateToString());
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

        this.dateModel = datetimeObject;
        this.timeModel = datetimeObject;
        this.formControl.setValue(this.convertDateToString());
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
    * Convert date and time models to a string in format of 'YYYY-MM-DD[ HH:mm:ss]'.
    */
    private convertDateToString(): string {
        if (!this.dateModel) {
            return null;
        }

        let datetimeString: string = MiscUtils.toDateString(this.dateModel);
        if (this.showTime && this.timeModel) {
            datetimeString += ' ' + MiscUtils.toTimeString(this.timeModel);
        }
        return datetimeString;
    }
}
