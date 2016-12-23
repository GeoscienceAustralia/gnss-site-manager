import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssAntennaComponent } from './gnss-antenna.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssAntennaComponent],
  exports: [GnssAntennaComponent],
})
export class GnssAntennaModule { }
