import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SiteLogService } from '../site-log/site-log.service';

export abstract class AbstractBaseComponent implements OnDestroy {

    public isEditable: boolean;
    public isItemEditable: boolean;

    private authorisedSubscription: Subscription;

    constructor(siteLogService: SiteLogService) {
        this.isItemEditable = false;
        this.authorisedSubscription = siteLogService.isUserAuthorisedToEditSite.subscribe(f => {
            this.isEditable = f;
        });
    }

    ngOnDestroy() {
        this.authorisedSubscription.unsubscribe();
    }
}
