import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemperatureSensorsGroupComponent } from './temperature-sensors-group.component';
import { TemperatureSensorItemComponent } from './temperature-sensor-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [TemperatureSensorsGroupComponent, TemperatureSensorItemComponent],
  exports: [ TemperatureSensorsGroupComponent, TemperatureSensorItemComponent, DynamicFormFieldsModule]
})
export class TemperatureSensorModule { }
