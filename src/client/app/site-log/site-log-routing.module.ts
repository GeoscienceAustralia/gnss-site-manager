import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteLogComponent } from './site-log.component';
import { ConfirmDeactivateSiteLogGuard } from './site-log-deactivate.module';
import { PrefetchSiteLogResolver } from '../shared/http-request/prefetch-site-log.service';

@NgModule({
    imports: [
        RouterModule.forChild([
        {
            path: 'siteLog/:id',
            component: SiteLogComponent,
            resolve: {
                siteLogModel: PrefetchSiteLogResolver
            },
            canDeactivate: [ConfirmDeactivateSiteLogGuard]
        }
        ])
    ],
    exports: [RouterModule],
    providers: [
        PrefetchSiteLogResolver
    ]
})
export class SiteLogRoutingModule { }
