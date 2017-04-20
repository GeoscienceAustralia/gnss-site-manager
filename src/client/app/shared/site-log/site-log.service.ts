import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JsonixService } from '../jsonix/jsonix.service';
import { WFSService, SelectSiteSearchType } from '../wfs/wfs.service';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';
import { JsonViewModelService } from '../json-data-view-model/json-view-model.service';
import { SiteLogViewModel } from '../json-data-view-model/view-model/site-log-view-model';
import { SiteLogDataModel } from '../json-data-view-model/data-model/site-log-data-model';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';

/**
 * This class provides the service with methods to retrieve CORS Setup info from DB.
 */
@Injectable()
export class SiteLogService {

    private isFormModifiedSubject: Subject<boolean> = new Subject();

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

    /**
     * Returns one site log defined by the fourCharacterId.
     * @param {string} fourCharacterId - The Four Character Id of the site.
     * @return {object[]} The Observable for the HTTP request in JSON format.
     */
    getSiteLogByFourCharacterId(fourCharacterId: string): Observable<any> {
        console.log('getSiteLogByFourCharacterId(fourCharacterId: ', fourCharacterId);
        return this.http.get(this.constantsService.getWebServiceURL()
            + '/siteLogs/search/findByFourCharacterId?id=' + fourCharacterId + '&format=json')
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Returns one site log defined by the fourCharacterId in ViewModel JSON format.
     *
     * @param {string} fourCharacterId - The Four Character Id of the site.
     * @return {object[]} The Observable for the HTTP request in JSON ViewModel format
     */
    getSiteLogByFourCharacterIdUsingGeodesyML(fourCharacterId: string): Observable<any> {
        return new Observable((observer: any) => {
            try {
                this.doGetSiteLogByFourCharacterIdUsingGeodesyML(fourCharacterId).subscribe(
                    (responseJson: any) => {
                        let siteLogViewModel: SiteLogViewModel = this.jsonViewModelService.dataModelToViewModelJson(responseJson);
                        observer.next(siteLogViewModel);
                    },
                    (error: Error) => HttpUtilsService.handleError
                );
            } catch (error) {
                observer.error(new Error(error));
            }
        });
    }

    getSiteLogByFourCharacterIdUsingGeodesyMLWFS(fourCharacterId: string): Observable<any> {
        // console.log('getSiteLogByFourCharacterIdGeodesyMLWFS(fourCharacterId: ', fourCharacterId);
        let params: SelectSiteSearchType = {
            // TODO - make this the selected value
            siteName: 'ADE1'
        };
        return this.wfsService.wfsQuery(params)
            .map(this.handleData)
            .catch((e: any) => {
                // propagate errors through the Observable
                return Observable.create((obs: any) => {
                    obs.error('ERROR in getSiteLogByFourCharacterIdUsingGeodesyMLWFS: ', e);
                });
            });
    }

    /**
     * Returns all site logs with the given siteId.
     * @param {number} siteId - The foreign key Site Id to the ViewSiteLog table.
     * @return {object[]} The Observable for the HTTP request.
     */
    getSiteLogsBySiteId(siteId: number): Observable <any> {
        let params = '';
        if (typeof siteId !== 'undefined' && siteId !== null && siteId > 0) {
            params = 'siteId=' + siteId;
        }
        return this.http.get(this.constantsService.getWebServiceURL() + '/siteLogs?' + params)
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Returns one site log defined by the row id provided.
     * @param {number} id - The primary key Id of the ViewSiteLog record.
     * @return {object[]} The Observable for the HTTP request.
     */
    getSiteLogById(id: number): Observable <any> {
        return this.http.get(this.constantsService.getWebServiceURL() + '/siteLogs?id=' + id)
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Returns all records from the ViewSiteLog table.
     * @return {object[]} The Observable for the HTTP request.
     */
    getAllSiteLogs(): Observable <any[]> {
        return this.http.get(this.constantsService.getWebServiceURL() + '/siteLogs?size=1000')
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Take JSON input as handled by the client-side, convert to GeodesyML and post to backend service.
     *
     * @param siteLogJson in Json (that will be translated to GeodesyML before posting to the backend service)
     */
    saveSiteLog(siteLogViewModel: SiteLogViewModel): Observable<Response> {
        console.log('saveSiteLog - siteLogViewModel: ', siteLogViewModel);
        let siteLogDataModel: SiteLogDataModel = this.jsonViewModelService.viewModelToDataModelJson(siteLogViewModel);
        console.log('saveSiteLog - siteLogDataModel: ', siteLogDataModel);

        // wrap the JSON object in a "geo:siteLog" element before converting to GeodesyML
        let siteLogJsonObj : any = {
            'geo:siteLog' : siteLogDataModel
        };

        let siteLogML: string = this.jsonixService.jsonToGeodesyML(siteLogJsonObj);
        // Add wrapper element
        let geodesyMl: string = '<geo:GeodesyML xsi:schemaLocation="urn:xml-gov-au:icsm:egeodesy:0.4"' +
            ' xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.4" xmlns:gml="http://www.opengis.net/gml/3.2"' +
            ' xmlns:ns9="http://www.w3.org/1999/xlink" xmlns:gmd="http://www.isotc211.org/2005/gmd"' +
            ' xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:om="http://www.opengis.net/om/2.0"' +
            ' xmlns:gco="http://www.isotc211.org/2005/gco"' +
            ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" gml:id="GeodesyMLType_20">';
        geodesyMl += siteLogML + '</geo:GeodesyML>';
        // console.log('saveSiteLog - geodesyMl: ', geodesyMl);
        console.log('saveSiteLog - geodesyMl (length): ', geodesyMl.length);

        const headers = new Headers();

        const user: User = this.authService.getUser();
        if (user !== null) {
          headers.append('Authorization', 'Bearer ' + this.authService.getUser().id_token);
        }

        return this.http.post(this.constantsService.getWebServiceURL() + '/siteLogs/upload',
                              geodesyMl,
                              { headers: headers })
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Method to allow clients to subscribe to know when the form modified state has changed
     * @return {Observable<null>}
     */
    getIsFormModifiedSubscription(): Observable<boolean> {
        return this.isFormModifiedSubject.asObservable();
    }

    /**
     * Inform subscribers when the form modified state has changed
     * @param isModified - state of form
     */
    sendFormModifiedStateMessage(isModified: boolean) {
        this.isFormModifiedSubject.next(isModified);
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
        console.log('getSiteLogByFourCharacterId(fourCharacterId: ', fourCharacterId);
        return this.http.get(this.constantsService.getWebServiceURL()
            + '/siteLogs/search/findByFourCharacterId?id=' + fourCharacterId + '&format=geodesyml')
            .map((response: Response) => {
                return this.handleXMLData(response);
            })
            .catch(HttpUtilsService.handleError);
    }

    private handleData(response: Response) {
        console.debug('site log service - from wfsService - handle data - response: ', response);
        let data: any = response.text();//.json();
        let status: number = response.status;
        let statustext: string = response.statusText;
        console.debug('SiteLogService call wfsQuery - status: ' + status + ' status text: ' + statustext + ' data: ', data);
        return response; //data;
    }
}
