import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HumiditySensorsGroupComponent } from './humidity-sensors-group.component';
import { HumiditySensorItemComponent } from './humidity-sensor-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [HumiditySensorsGroupComponent, HumiditySensorItemComponent],
  exports: [ HumiditySensorsGroupComponent, HumiditySensorItemComponent]
})
export class HumiditySensorModule { }
