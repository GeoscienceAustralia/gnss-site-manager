import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GnssReceiversGroupComponent } from './gnss-receivers-group.component';
import { GnssReceiverItemComponent } from './gnss-receiver-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [GnssReceiversGroupComponent, GnssReceiverItemComponent],
    exports: [GnssReceiversGroupComponent, GnssReceiverItemComponent]
})
export class GnssReceiverModule {
}
