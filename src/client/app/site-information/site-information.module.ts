import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { SiteInformationComponent } from './site-information.component';
import { SiteIdentificationModule } from './site-identification.module';
import { SiteLocationModule } from './site-location.module';
import { ResponsiblePartyModule } from '../responsible-party/responsible-party.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormInputModule,
        SiteIdentificationModule,
        SiteLocationModule,
        ResponsiblePartyModule
    ],
    declarations: [SiteInformationComponent],
    exports: [SiteInformationComponent]
})
export class SiteInformationModule { }
