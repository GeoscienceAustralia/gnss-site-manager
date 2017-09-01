import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DialogService, SiteLogService } from '../index';
import { SiteLogViewModel } from '../../site-log/site-log-view-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrefetchSiteLogResolver implements Resolve<SiteLogViewModel> {

    constructor(private router: Router,
                private dialogService: DialogService,
                private siteLogService: SiteLogService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SiteLogViewModel> {
        let homeUrl: string = '/';
        let fourCharacterId: string = route.params['id'];
        if (fourCharacterId === 'newSite') {
            return Observable.of(new SiteLogViewModel());
        }
        return this.siteLogService.getSiteLogByFourCharacterId(fourCharacterId)
            .catch((error: any): any => {
                this.router.navigate([homeUrl]);
                this.dialogService.showErrorMessage('No site log found for ' + fourCharacterId);
                console.log(error);
                return Observable.empty();
            });
    }
}
