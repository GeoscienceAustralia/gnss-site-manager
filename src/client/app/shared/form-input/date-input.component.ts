import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';
import { DateFormatValidator } from '../form-input-validators/date-format-validator';
import { MiscUtils } from '../index';

/**
 * This class represents the Date Input Component for choosing dates.
 */
@Component({
    moduleId: module.id,
    selector: 'date-input',
    templateUrl: 'date-input.component.html',
    styleUrls: ['date-input.component.css']
})
export class DateInputComponent extends AbstractInput implements OnInit {

    @Output()
    dateSelectEvent: EventEmitter<string> = new EventEmitter<string>();

    public showDatePicker: boolean = false;
    public dateModel: Date;

    constructor(private elemRef: ElementRef) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }

        validators.push(new DateFormatValidator());
        setTimeout( () => {
            this.formControl.setValidators(validators);
        });
    }

    public isFormDisabled(): boolean {
        return this.form.disabled;
    }

   /**
    * Close the calendar if mouse clicks outside of it
    */
    @HostListener('document:click', ['$event'])
    public handleClickOutside(event: any) {
        if (this.showDatePicker) {
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

            this.showDatePicker = isInside;
        }
    }

    public updateDate(event: any): void {
        this.dateModel = event;
        let dateString: string = MiscUtils.formatDateToDateString(this.dateModel);
        this.dateSelectEvent.emit(dateString);
        this.formControl.setValue(dateString);
        this.formControl.markAsDirty();
        this.showDatePicker = false;
    }

   /**
    * Update date of DatePicker in response to direct changes made in the input box
    */
    public updateDatePicker(): void {
        this.dateModel = new Date(this.formControl.value);
        this.dateSelectEvent.emit(this.formControl.value);
    }
}
