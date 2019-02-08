import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService, CorsSiteService } from '../index';
import { SiteAdministrationModel } from '../../site-administration/site-administration-model';

@Injectable()
export class PrefetchCorsSiteResolver implements Resolve<SiteAdministrationModel> {

    constructor(private router: Router,
                private dialogService: DialogService,
                private corsSiteService: CorsSiteService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SiteAdministrationModel> {
        let homeUrl: string = '/';
        let fourCharacterId: string = route.params['id'];
        if (fourCharacterId === 'newSite') {
            return Observable.of(new SiteAdministrationModel());
        }
        return this.corsSiteService.getSiteAdministration(fourCharacterId)
            .catch((error: any): any => {
                this.router.navigate([homeUrl]);
                this.dialogService.showErrorMessage('No CORS site found for ' + fourCharacterId);
                console.log(error);
                return Observable.empty();
            });
    }
}
