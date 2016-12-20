import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TextInputComponent],
  exports: [TextInputComponent]
})
export class DynamicFormFieldsModule { }
