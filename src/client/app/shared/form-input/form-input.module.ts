import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, TooltipModule } from 'ng2-bootstrap';
import { TypeaheadModule } from 'ng2-bootstrap';
import { TextInputComponent } from './text-input.component';
import { ReceiverTypeInputComponent } from './receiver-type-input.component';
import { AntennaTypeInputComponent } from './antenna-type-input.component';
import { TextAreaInputComponent } from './textarea-input.component';
import { NumberInputComponent } from './number-input.component';
import { DatetimeInputComponent } from './datetime-input.component';
import { UrlInputComponent } from './url-input.component';
import { EmailInputComponent } from './email-input.component';
import { CheckboxesInputComponent } from './checkboxes-input.component';
import { RadioButtonsInputComponent } from './radiobuttons-input.component';
import { MultiSelectBoxesComponent } from './multi-select-boxes.component';
import { ListBoxComponent } from './list-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    AntennaTypeInputComponent,
    ReceiverTypeInputComponent,
    TextInputComponent,
    TextAreaInputComponent,
    NumberInputComponent,
    DatetimeInputComponent,
    UrlInputComponent,
    EmailInputComponent,
    CheckboxesInputComponent,
    RadioButtonsInputComponent,
    MultiSelectBoxesComponent,
    ListBoxComponent
  ],
  exports: [
    AntennaTypeInputComponent,
    ReceiverTypeInputComponent,
    TextInputComponent,
    TextAreaInputComponent,
    NumberInputComponent,
    DatetimeInputComponent,
    UrlInputComponent,
    EmailInputComponent,
    CheckboxesInputComponent,
    RadioButtonsInputComponent,
    MultiSelectBoxesComponent,
    ListBoxComponent
  ]
})
export class FormInputModule {}
