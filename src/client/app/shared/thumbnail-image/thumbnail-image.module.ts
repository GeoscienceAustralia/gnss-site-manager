import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailImageComponent } from './thumbnail-image.component';
import { FullSizeImageComponent } from './full-size-image.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThumbnailImageComponent,
        FullSizeImageComponent,
    ],
    exports: [
        ThumbnailImageComponent,
        FullSizeImageComponent,
    ]
})
export class ThumbnailImageModule { }
