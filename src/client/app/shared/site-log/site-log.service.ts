import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JsonixService } from '../jsonix/jsonix.service';
import { WFSService } from '../wfs/wfs.service';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';
import { JsonViewModelService } from '../json-data-view-model/json-view-model.service';
import { SiteLogViewModel } from '../../site-log/site-log-view-model';
import { SiteLogDataModel } from '../json-data-view-model/data-model/site-log-data-model';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';

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

    private applicationStateSubject: Subject<ApplicationState> = new Subject();
    private unsubscribe: Subject<void> = new Subject<void>();

     /**
     * Creates a new SiteLogService with the injected Http.
     * @param {Http} http - The injected Http.
     * @param jsonixService - Service for translating GeodesyML to Json
     * @param constantsService - Constants used in the application
     * @param wfsService - serice to make wfs queries to backend geoserver
     * @constructor
     */
    constructor(private http: Http, private jsonixService: JsonixService,
                private wfsService: WFSService, private constantsService: ConstantsService,
                private jsonViewModelService: JsonViewModelService,
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
        return this.doGetSiteLogByFourCharacterIdUsingGeodesyML(fourCharacterId)
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

        const headers = new Headers();
        const user: User = this.authService.getUser();
        if (user !== null) {
          headers.append('Authorization', 'Bearer ' + this.authService.getUser().id_token);
        }

        return this.http.post(this.constantsService.getWebServiceURL() + '/siteLogs/upload',
                              this.getGeodesyMlFromViewModel(siteLogViewModel),
                              { headers: headers })
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }

    saveNewSiteLog(siteLogViewModel: SiteLogViewModel): Observable<Response> {
        console.log('Save new SiteLog - siteLogViewModel: ', siteLogViewModel);

        const user: User = this.authService.getUser();
        let newSiteLogData: any = {
            firstName: user.profile.first_name || '',
            lastName: user.profile.family_name || '',
            organisation: user.profile.organisation || '',
            position: user.profile.position || '',
            email : user.profile.email || '',
            phone : user.profile.phone_number || '',
            siteLogData: this.getGeodesyMlFromViewModel(siteLogViewModel)
        };

        console.log(newSiteLogData);

        return this.http.post(this.constantsService.getWebServiceURL() + '/newCorsSiteRequests', newSiteLogData);
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

    private handleXMLData(response: Response): string {
        if (response.status === 200) {
            var geodesyMl: any = response.text();
            let json: string = this.jsonixService.geodesyMLToJson(geodesyMl);
            console.log('handleXMLData - json: ', json);
            return json;
        } else {
            let msg: string = 'Error with GET: ' + response.url;
            throw new Error(msg);
        }
    }

    /**
     * Returns one site log defined by the fourCharacterId.  Alternative method that retrieves GeodeesyML format
     * from the backend service and returns an alternative JSON equivalent that is almost, but not quite the same
     * as the JSON returned froom getSiteLogByFourCharacterId();
     * @param {string} fourCharacterId - The Four Character Id of the site.
     * @return {object[]} The Observable for the HTTP request in JSON format slightly different from that from
     * getSiteLogByFourCharacterId().
     */
    private doGetSiteLogByFourCharacterIdUsingGeodesyML(fourCharacterId: string): Observable<any> {
        return this.http.get(this.constantsService.getWebServiceURL()
            + '/siteLogs/search/findByFourCharacterId?id=' + fourCharacterId + '&format=geodesyml')
            .map((response: Response) => {
                return this.handleXMLData(response);
            })
            .catch(HttpUtilsService.handleError);
    }
}
