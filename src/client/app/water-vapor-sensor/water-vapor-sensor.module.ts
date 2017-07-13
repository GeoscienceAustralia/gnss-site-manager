import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaterVaporSensorsGroupComponent } from './water-vapor-sensors-group.component';
import { WaterVaporSensorItemComponent } from './water-vapor-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [WaterVaporSensorsGroupComponent, WaterVaporSensorItemComponent],
    exports: [WaterVaporSensorsGroupComponent, WaterVaporSensorItemComponent, FormInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WaterVaporSensorModule {
}
