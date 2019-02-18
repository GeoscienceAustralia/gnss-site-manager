import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap';
import { TextInputComponent } from './text-input.component';
import { TextAreaInputComponent } from './textarea-input.component';
import { NumberInputComponent } from './number-input.component';
import { DatetimeInputComponent } from './datetime-input.component';
import { UrlInputComponent } from './url-input.component';
import { EmailInputComponent } from './email-input.component';
import { CheckboxesInputComponent } from './checkboxes-input.component';
import { RadioButtonsInputComponent } from './radiobuttons-input.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatepickerModule.forRoot()],
  declarations: [TextInputComponent, TextAreaInputComponent, NumberInputComponent, DatetimeInputComponent,
                 UrlInputComponent, EmailInputComponent, CheckboxesInputComponent, RadioButtonsInputComponent],
  exports: [TextInputComponent, TextAreaInputComponent, NumberInputComponent, DatetimeInputComponent,
            UrlInputComponent, EmailInputComponent, CheckboxesInputComponent, RadioButtonsInputComponent]
})
export class FormInputModule {}
