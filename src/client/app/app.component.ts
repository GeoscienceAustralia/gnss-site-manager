import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { Config, CorsSiteService, CorsSetupService, SiteLogService, NameListService, ServiceWorkerService } from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, SelectSiteComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [CorsSiteService, CorsSetupService, SiteLogService, NameListService, ServiceWorkerService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
})

export class AppComponent {
  constructor() {
    console.log('Environment config', Config);
  }
}
