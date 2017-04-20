import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrequencyStandardItemComponent } from './frequency-standard-item.component';
import { FrequencyStandardGroupComponent } from './frequency-standard-group.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [FrequencyStandardItemComponent, FrequencyStandardGroupComponent],
  exports: [FrequencyStandardItemComponent, FrequencyStandardGroupComponent]
})
export class FrequencyStandardModule { }
