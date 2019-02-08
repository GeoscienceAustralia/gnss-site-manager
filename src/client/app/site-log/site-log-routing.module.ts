import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteLogComponent } from './site-log.component';
import { ConfirmDeactivateSiteLogGuard } from './site-log-deactivate.module';
import { PrefetchSiteLogResolver } from '../shared/site-log/prefetch-site-log.service';
import { PrefetchCorsSiteResolver } from '../shared/cors-site/prefetch-cors-site.service';

@NgModule({
    imports: [
        RouterModule.forChild([
        {
            path: 'siteLog/:id',
            component: SiteLogComponent,
            resolve: {
                siteLogModel: PrefetchSiteLogResolver,
                siteAdminModel: PrefetchCorsSiteResolver,
            },
            canDeactivate: [ConfirmDeactivateSiteLogGuard]
        }
        ])
    ],
    exports: [RouterModule],
    providers: [
        PrefetchSiteLogResolver,
        PrefetchCorsSiteResolver,
    ]
})
export class SiteLogRoutingModule { }
