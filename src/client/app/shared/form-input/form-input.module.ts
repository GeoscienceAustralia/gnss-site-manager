import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';
import { TextAreaInputComponent } from './textarea-input.component';
import { NumberInputComponent } from './number-input.component';
import { DatepickerModule } from 'ng2-bootstrap';
import { DatetimeInputComponent } from './datetime-input.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatepickerModule.forRoot()],
  declarations: [TextInputComponent, TextAreaInputComponent, NumberInputComponent, DatetimeInputComponent],
  exports: [TextInputComponent, TextAreaInputComponent, NumberInputComponent, DatetimeInputComponent]
})
export class FormInputModule {}
