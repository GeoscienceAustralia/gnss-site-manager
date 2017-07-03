import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { SiteInformationComponent } from './site-information.component';
import { SiteIdentificationComponent } from '../site-information/site-identification.component';
import { SiteLocationComponent } from '../site-information/site-location.component';
import { ResponsiblePartyModule } from '../responsible-party/responsible-party.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormInputModule,
        SiteInformationComponent,
        SiteIdentificationComponent,
        SiteLocationComponent,
        ResponsiblePartyModule,
    ],
    declarations: [SiteInformationComponent, SiteIdentificationComponent, SiteLocationComponent],
    exports: [SiteInformationComponent, SiteIdentificationComponent, SiteLocationComponent],
})

export class SiteInformationModule { }
