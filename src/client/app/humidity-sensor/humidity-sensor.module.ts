import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HumiditySensorsGroupComponent } from './humidity-sensors-group.component';
import { HumiditySensorItemComponent } from './humidity-sensor-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, DynamicFormFieldsModule],
  declarations: [HumiditySensorsGroupComponent, HumiditySensorItemComponent],
  exports: [ HumiditySensorsGroupComponent, HumiditySensorItemComponent, DynamicFormFieldsModule],
})
export class HumiditySensorModule { }
