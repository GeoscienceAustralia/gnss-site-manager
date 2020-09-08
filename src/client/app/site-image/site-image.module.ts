import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { ThumbnailImageModule } from '../shared/thumbnail-image/thumbnail-image.module';
import { SiteImageComponent } from './site-image.component';

@NgModule({
    imports: [
        CommonModule,
        FormInputModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
        ThumbnailImageModule,
    ],
    declarations: [SiteImageComponent],
    exports: [SiteImageComponent],
})
export class SiteImageModule {
}
