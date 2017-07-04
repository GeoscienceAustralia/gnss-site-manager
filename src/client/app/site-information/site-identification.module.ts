import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { SiteIdentificationComponent } from './site-identification.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormInputModule
    ],
    declarations: [SiteIdentificationComponent],
    exports: [SiteIdentificationComponent]
})
export class SiteIdentificationModule {
}
