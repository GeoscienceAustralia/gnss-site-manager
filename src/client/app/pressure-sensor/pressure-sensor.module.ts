import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PressureSensorsGroupComponent } from './pressure-sensors-group.component';
import { PressureSensorItemComponent } from './pressure-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [PressureSensorsGroupComponent, PressureSensorItemComponent],
    exports: [PressureSensorsGroupComponent, PressureSensorItemComponent, FormInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PressureSensorModule {
}
