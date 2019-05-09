import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteLogComponent } from './site-log.component';
import { ConfirmDeactivateSiteLogGuard } from './site-log-deactivate.module';
import { PrefetchSiteLogResolver } from '../shared/site-log/prefetch-site-log.service';
import { PrefetchCorsSiteResolver } from '../shared/cors-site/prefetch-cors-site.service';
import { PrefetchCorsNetworkResolver } from '../shared/cors-network/prefetch-cors-network.service';
import { PrefetchReceiverAntennaCodeResolver } from '../shared/receiver-antenna-code/prefetch-receiver-antenna-code.service';

@NgModule({
    imports: [
        RouterModule.forChild([
        {
            path: 'siteLog/:id',
            component: SiteLogComponent,
            resolve: {
                siteLogModel: PrefetchSiteLogResolver,
                siteAdminModel: PrefetchCorsSiteResolver,
                corsNetworkList: PrefetchCorsNetworkResolver,
                receiverAntennaCodeJson: PrefetchReceiverAntennaCodeResolver
            },
            canDeactivate: [ConfirmDeactivateSiteLogGuard]
        }
        ])
    ],
    exports: [RouterModule],
    providers: [
        PrefetchSiteLogResolver,
        PrefetchCorsSiteResolver,
        PrefetchCorsNetworkResolver,
        PrefetchReceiverAntennaCodeResolver
    ]
})
export class SiteLogRoutingModule { }
