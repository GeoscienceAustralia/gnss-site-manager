import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GnssAntennaItemComponent } from './gnss-antenna-item.component';
import { GnssAntennaGroupComponent } from './gnss-antenna-group.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [GnssAntennaItemComponent, GnssAntennaGroupComponent],
    exports: [GnssAntennaItemComponent, GnssAntennaGroupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GnssAntennaModule {
}
