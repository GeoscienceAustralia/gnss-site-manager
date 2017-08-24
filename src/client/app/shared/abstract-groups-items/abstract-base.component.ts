import { SiteLogService } from '../site-log/site-log.service';
import { MiscUtils } from '../global/misc-utils';

export abstract class AbstractBaseComponent {

    public isEditable: boolean;
    public isOpen: boolean = false;

    constructor(siteLogService: SiteLogService) {
        siteLogService.isUserAuthorisedToEditSite.subscribe(f => {
            this.isEditable = f;
        });
    }

    /**
     * Toggle (open or close) the group or item
     */
    public toggle(event: UIEvent) {
        event.preventDefault();
        this.isOpen = MiscUtils.scrollIntoView(event, this.isOpen);
    }
}
