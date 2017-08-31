import { SiteLogService } from '../http-request/site-log.service';

export abstract class AbstractBaseComponent {

    public isEditable: boolean;

    constructor(siteLogService: SiteLogService) {
        siteLogService.isUserAuthorisedToEditSite.subscribe(f => {
            this.isEditable = f;
        });
    }
}
