import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../global/dialog.service';
import { ReceiverAntennaCodeService } from './receiver-antenna-code.service';

@Injectable()
export class PrefetchReceiverAntennaCodeResolver implements Resolve<any> {

    constructor(
        private router: Router,
        private dialogService: DialogService,
        private receiverAntennaCodeService: ReceiverAntennaCodeService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        let homeUrl: string = '/';
        return this.receiverAntennaCodeService.codeXML()
            .catch((error: any): any => {
                this.router.navigate([homeUrl]);
                this.dialogService.showErrorMessage('No XML fetched');
                console.log(error);
                return Observable.empty();
            });
    }
}
