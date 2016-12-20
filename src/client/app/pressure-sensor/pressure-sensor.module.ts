import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';
import { GnssPressureSensorComponent } from './pressure-sensor.component';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule, DynamicFormFieldsModule],
  declarations: [GnssPressureSensorComponent],
  exports: [GnssPressureSensorComponent, DynamicFormFieldsModule],
})
export class PressureSensorModule { }
