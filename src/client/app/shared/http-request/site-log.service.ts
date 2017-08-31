import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JsonixService } from '../jsonix/jsonix.service';
import { WFSService } from '../wfs/wfs.service';
import { HttpRequestService } from './http-request.service';
import { JsonViewModelService } from '../json-data-view-model/json-view-model.service';
import { SiteLogViewModel } from '../../site-log/site-log-view-model';
import { SiteLogDataModel } from '../json-data-view-model/data-model/site-log-data-model';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MiscUtils } from '../global/misc-utils';

export enum ApplicationSaveState {
    idle, saving, saved
}

export interface ApplicationState {
    applicationFormModified: boolean;
    applicationFormInvalid: boolean;
    applicationSaveState: ApplicationSaveState;
}

/**
 * This class provides the service with methods to retrieve CORS Setup info from DB.
 */
@Injectable()
export class SiteLogService implements OnDestroy {

    public isUserAuthorisedToEditSite: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private applicationStateSubject: Subject<ApplicationState> = new Subject();
    private unsubscribe: Subject<void> = new Subject<void>();

     /**
     * Creates a new SiteLogService with the injected Http.
     *
     * @param httpRequestService - The injected HttpRequestService.
     * @param jsonixService - Service for httpRequestService GeodesyML to Json
     * @param wfsService - serice to make wfs queries to backend geoserver
     * @constructor
     */
    constructor(private httpRequestService: HttpRequestService, private jsonixService: JsonixService,
                private wfsService: WFSService, private jsonViewModelService: JsonViewModelService,
                private authService: UserAuthService) {
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Returns one site log defined by the fourCharacterId in ViewModel JSON format.
     *
     * @param {string} fourCharacterId - The Four Character Id of the site.
     * @return {object} - The Promise for the HTTP request in JSON ViewModel format
     */
    getSiteLogByFourCharacterId(fourCharacterId: string): Observable<SiteLogViewModel> {
        return this.httpRequestService.get('siteLogs/search/findByFourCharacterId?id=' + fourCharacterId, 'geodesyml')
            .takeUntil(this.unsubscribe)
            .map((response: any) => {
                let siteLog: any  = response['geo:GeodesyML'].elements[0];
                return this.jsonViewModelService.dataModelToViewModel(siteLog);
            });
    }

    /**
     * Take JSON input as handled by the client-side, convert to GeodesyML and post to backend service.
     *
     * @param siteLogJson in Json (that will be translated to GeodesyML before posting to the backend service)
     */
    saveSiteLog(siteLogViewModel: SiteLogViewModel): Observable<Response> {
        console.log('Save existing SiteLog - siteLogViewModel: ', siteLogViewModel);

        const user: User = this.authService.user.value;
        siteLogViewModel.formInformation.preparedBy = user.profile.sub;
        siteLogViewModel.formInformation.datePrepared = MiscUtils.getUTCDateTime();

        // TODO: update to typescript 2.4.1, then change to string enum
        siteLogViewModel.formInformation.reportType = 'UPDATE';

        const headers = new Headers();
        if (user) {
          headers.append('Authorization', 'Bearer ' + user.id_token);
        }

        return this.httpRequestService.post('siteLogs/upload',
                              this.getGeodesyMlFromViewModel(siteLogViewModel),
                              { headers: headers });
    }

    saveNewSiteLog(siteLogViewModel: SiteLogViewModel): Observable<Response> {
        console.log('Save new SiteLog - siteLogViewModel: ', siteLogViewModel);

        const user: User = this.authService.user.value;
        siteLogViewModel.formInformation.preparedBy = user.profile.sub;
        siteLogViewModel.formInformation.datePrepared = MiscUtils.getUTCDateTime();

        // TODO: update to typescript 2.4.1, then change to string enum
        siteLogViewModel.formInformation.reportType = 'NEW';

        let newSiteLogData: any = {
            firstName: user.profile.first_name || '',
            lastName: user.profile.family_name || '',
            organisation: user.profile.organisation || '',
            position: user.profile.position || '',
            email : user.profile.email || '',
            phone : user.profile.phone_number || '',
            siteLogData: this.getGeodesyMlFromViewModel(siteLogViewModel)
        };
        const headers = new Headers();
        if (user) {
          headers.append('Authorization', 'Bearer ' + user.id_token);
        }
        return this.httpRequestService.post('newCorsSiteRequests', newSiteLogData, { headers: headers });
    }

    /**
     * Method to allow clients to subscribe to know about application state changes.
     * @return {Observable<ApplicationStateSubject>}
     */
    getApplicationState(): Observable<ApplicationState> {
        return this.applicationStateSubject.asObservable();
    }

    /**
     * Inform subscribers when the form modified state has changed
     * @param applicationState - the state object.  Fields can be null if its state is unknown
     */
    sendApplicationStateMessage(applicationState: ApplicationState) {
        this.applicationStateSubject.next(applicationState);
    }

    private getGeodesyMlFromViewModel(siteLogViewModel: SiteLogViewModel): string {
        let siteLogDataModel: SiteLogDataModel = this.jsonViewModelService.viewModelToDataModel(siteLogViewModel);

        return this.jsonixService.jsonToGeodesyML({
            'geo:GeodesyML': {
                elements: [
                    { 'geo:siteLog': siteLogDataModel },
                ],
            }
        });
    }
}
