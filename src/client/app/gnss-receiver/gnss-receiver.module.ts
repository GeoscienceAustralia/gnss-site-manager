import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssReceiverComponent } from './gnss-receiver.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssReceiverComponent],
  exports: [GnssReceiverComponent],
})
export class GnssReceiverModule { }
