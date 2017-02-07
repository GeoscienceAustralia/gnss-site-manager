import {Routes} from '@angular/router';

import {SelectSiteRoutes} from './select-site/index';
import {SiteInfoRoutes} from './site-info/index';
import {AboutRoutes} from './about/index';
import {LoginRoutes} from './login/login.routes';

export const routes: Routes = [
    ...SiteInfoRoutes,
    ...SelectSiteRoutes,
    ...AboutRoutes,
    ...LoginRoutes,
    {
        // Default
        path: '**',
        redirectTo: '/'
    }
];
