import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssTemperatureSensorComponent } from './temperature-sensor.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssTemperatureSensorComponent],
  exports: [GnssTemperatureSensorComponent],
})
export class TemperatureSensorModule { }
