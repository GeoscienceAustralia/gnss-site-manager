import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssReceiverItemComponent } from './gnss-receiver-item.component';
import { GnssReceiverGroupComponent } from './gnss-receiver-group.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssReceiverItemComponent, GnssReceiverGroupComponent],
  exports: [GnssReceiverItemComponent, GnssReceiverGroupComponent],
})
export class GnssReceiverModule { }
