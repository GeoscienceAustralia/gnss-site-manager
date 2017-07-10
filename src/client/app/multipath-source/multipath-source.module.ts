import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { MultipathSourceItemComponent } from './multipath-source-item.component';
import { MultipathSourceGroupComponent } from './multipath-source-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [MultipathSourceGroupComponent, MultipathSourceItemComponent],
    exports: [MultipathSourceGroupComponent, MultipathSourceItemComponent, FormInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultipathSourceModule {
}
