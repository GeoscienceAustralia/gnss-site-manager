import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaterVaporSensorsGroupComponent } from './water-vapor-sensors-group.component';
import { WaterVaporSensorItemComponent } from './water-vapor-sensor-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [WaterVaporSensorsGroupComponent, WaterVaporSensorItemComponent],
  exports: [ WaterVaporSensorsGroupComponent, WaterVaporSensorItemComponent, DynamicFormFieldsModule]
})
export class WaterVaporSensorModule { }
