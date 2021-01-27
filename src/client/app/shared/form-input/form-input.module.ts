import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, TimepickerModule, TooltipModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap-ga';
import { TextInputComponent } from './text-input.component';
import { TypeaheadInputComponent } from './typeahead-input.component';
import { TextAreaInputComponent } from './textarea-input.component';
import { NumberInputComponent } from './number-input.component';
import { DatetimeInputComponent } from './datetime-input.component';
import { UrlInputComponent } from './url-input.component';
import { EmailInputComponent } from './email-input.component';
import { CheckboxesInputComponent } from './checkboxes-input.component';
import { RadioButtonsInputComponent } from './radiobuttons-input.component';
import { MultiSelectBoxesComponent } from './multi-select-boxes.component';
import { ListBoxComponent } from './list-box.component';
import { FileInputComponent } from './file-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    TypeaheadInputComponent,
    TextInputComponent,
    TextAreaInputComponent,
    NumberInputComponent,
    DatetimeInputComponent,
    UrlInputComponent,
    EmailInputComponent,
    CheckboxesInputComponent,
    RadioButtonsInputComponent,
    MultiSelectBoxesComponent,
    ListBoxComponent,
    FileInputComponent,
  ],
  exports: [
    TypeaheadInputComponent,
    TextInputComponent,
    TextAreaInputComponent,
    NumberInputComponent,
    DatetimeInputComponent,
    UrlInputComponent,
    EmailInputComponent,
    CheckboxesInputComponent,
    RadioButtonsInputComponent,
    MultiSelectBoxesComponent,
    ListBoxComponent,
    FileInputComponent,
  ]
})
export class FormInputModule {}
