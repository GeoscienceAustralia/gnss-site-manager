import { Routes } from '@angular/router';

import { SelectSiteRoutes } from './+select-site/index';
import { SiteInfoRoutes } from './+site-info/index';

export const routes: Routes = [
  ...SiteInfoRoutes,
  ...SelectSiteRoutes,
];
