import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLocationComponent } from './site-location.component';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FormInputModule,
    ],
    declarations: [SiteLocationComponent],
    exports: [SiteLocationComponent],
})

export class SiteLocationModule {
}
