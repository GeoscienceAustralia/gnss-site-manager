import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule, TooltipModule, CollapseModule } from 'ng2-bootstrap';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { StatusInfoComponent } from './status-info/status-info.component';
import { CorsSiteService } from './cors-site/index';
import { CorsNetworkService } from './cors-network/index';
import { SiteLogService } from './site-log/index';
import { JsonixService } from './jsonix/index';
import { WFSService } from './wfs/index';
import { DialogService, MiscUtils, UserAuthService } from './global/index';
import { ConstantsService, HttpUtilsService } from './global/index';
import { JsonViewModelService } from './json-data-view-model/index';
import { ReceiverAntennaCodeService } from './receiver-antenna-code/receiver-antenna-code.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule.forRoot(),
        DropdownModule.forRoot(),
        TooltipModule.forRoot()
    ],
    declarations: [
        ToolbarComponent,
        FooterComponent,
        StatusInfoComponent
    ],
    exports: [
        ToolbarComponent,
        FooterComponent,
        StatusInfoComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MiscUtils,
                JsonixService,
                SiteLogService,
                DialogService,
                CorsSiteService,
                CorsNetworkService,
                WFSService,
                ConstantsService,
                HttpUtilsService,
                JsonViewModelService,
                UserAuthService,
                ReceiverAntennaCodeService
            ]
        };
    }
}
