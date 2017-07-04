import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { SiteLocationComponent } from './site-location.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormInputModule
    ],
    declarations: [SiteLocationComponent],
    exports: [SiteLocationComponent],
})
export class SiteLocationModule {
}
