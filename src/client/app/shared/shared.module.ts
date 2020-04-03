import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule, TooltipModule, CollapseModule  } from 'ng2-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatusInfoComponent } from './status-info/status-info.component';
import { CorsSiteService } from './cors-site/index';
import { GeodesyMLCodelistService } from './geodesyml-codelist/geodesyml-codelist.service';
import { AssociatedDocumentService } from './associated-document/associated-document.service';
import { CorsNetworkService } from './cors-network/index';
import { SiteLogService } from './site-log/index';
import { JsonixService } from './jsonix/index';
import { WFSService } from './wfs/index';
import { DialogService, MiscUtils, UserAuthService  } from './global/index';
import { ConstantsService, HttpUtilsService } from './global/index';
import { JsonViewModelService } from './json-data-view-model/index';

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
    HeaderComponent,
    FooterComponent,
    StatusInfoComponent
  ],
  exports: [
    HeaderComponent,
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
      providers: [MiscUtils, JsonixService, SiteLogService, DialogService, GeodesyMLCodelistService,
                  AssociatedDocumentService, CorsSiteService, CorsNetworkService, WFSService, ConstantsService,
                  HttpUtilsService, JsonViewModelService, UserAuthService,
                 ]
    };
  }
}
