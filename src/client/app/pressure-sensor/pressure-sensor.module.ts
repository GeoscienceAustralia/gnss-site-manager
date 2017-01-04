import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssPressureSensorComponent } from './pressure-sensor.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssPressureSensorComponent],
  exports: [GnssPressureSensorComponent]
})
export class PressureSensorModule { }
