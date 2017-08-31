import { Injectable, OnDestroy } from '@angular/core';
import { JsonixService } from '../jsonix/jsonix.service';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

/**
 * This class provides the service to work with WFS in Geoservers.
 */

export interface SelectSiteSearchType {
    siteName?: string;
    site4CharId?: string;
    site9charId?: string;
}

@Injectable()
export class WFSService implements OnDestroy {
    private unsubscribe: Subject<void> = new Subject<void>();

    /**
     * Creates a new WFS Service with the injected Http.
     * @param jsonixService - Service for translating GeodesyML to Json
     * @param {Http} http - The injected Http.
     * @param constantsService - Constants used in the application
     * @constructor
     */
    constructor(private jsonixService: JsonixService, private http: Http, private constantsService: ConstantsService) {
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Send a WFS Query to the geoserver.  For selecting a site.
     * @param params type with mandatory and optional fields.
     * @return Observable containing a response with a JSON body containing the ViewSiteLog from the WFS Server query.
     */
    wfsQuery(params: SelectSiteSearchType): Observable<any> {
        console.debug('wfsQuery - params: ', params);
        return this.wfsGetFeatureRequestBody(params)
            .flatMap((wfsRequestBody: string) => this.doWFSQuery(wfsRequestBody));
    }

    /**
     * The WFS response is ALWAYS 200 (unless a server error).  Parse to see if good or bad.
     * If bad log the response and return an Observer error to be picked up by the subscriber.
     * If good return as-is.
     *
     * @param xmlQuery to send to the WFS Server
     * @returns {Observable<any>} the content from the query
     */
    private doWFSQuery(xmlQuery: string): Observable<any> {
        let content: any;
        return new Observable((observer: any) => {
            this.doWFSPost(xmlQuery)
                .takeUntil(this.unsubscribe)
                .subscribe(
                    (responseJson: any) => {
                        try {
                            let response: Response = this.handleWFSPostResponse(responseJson);
                            content = this.getContent(response);
                        } catch (error) {
                            observer.error(new Error(error));
                        }
                        observer.next(content);
                        observer.complete();
                    },
                    (error: Error) => HttpUtilsService.handleError
                );
        });
    }

    /**
     * Extract the 'member' part from the WFS Query response.  Exception if this nor expected 'content' can't be found.
     * With reagard to the array that is returned, it is built.  The WFS Call returns an object with a field
     * called 'wfs:FeatureCollection'. Under that is the array 'member' that has an object 'content' and that
     * contains the data of interest.  This will map this structure to a flat array of these data of interest.
     * @param wfsResponse
     * @return an array of the data items of inteerest.
     */
    private getContent(wfsResponse: Response): any[] {
        let contents: string[] = [];
        let body: any = JSON.parse(wfsResponse.text());
        if (body.hasOwnProperty('ows:ExceptionReport')) {
            throw new Error(JSON.stringify(body));
        } else if (body.hasOwnProperty('wfs:FeatureCollection')) {
            if (body['wfs:FeatureCollection'].hasOwnProperty('member')) {
                let members: string[] = body['wfs:FeatureCollection']['member'];
                members.map((member: any) => {
                    if (member.hasOwnProperty('content')) {
                        contents.push(member['content'][0]);
                    }
                });
            }
        } else {
            throw new Error('WFS Query - unexpected response: '+ JSON.stringify(body));
        }
        console.debug('WFSQuery / getContent: ', contents);
        return contents;
    }


    /**
     * Do the HTTP Post and handle responses in helper method.
     * @param xmlQuery
     * @returns {Observable<R>}
     */
    private doWFSPost(xmlQuery: string): Observable < any > {
        console.debug('WFS Query being POSTed to "' + this.constantsService.getWFSGeoserverURL() + '": ', xmlQuery);
        return this.http.post(this.constantsService.getWFSGeoserverURL(), xmlQuery)
            .map(this.handleData)
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Called when  no HTTP errors.  Simply extract what we need, log as desired and return the response.
     * @param response
     * @returns {Response}
     */
    private handleData(response: Response): Response {
        let data: any = response.text();//.json();
        let status: number = response.status;
        let statustext: string = response.statusText;
        // console.debug('wfsQuery - status: ' + status + ' status text: ' + statustext + ' data: ', data);
        console.debug('wfsQuery - status: ' + status + ' status text: ' + statustext + ' data (length): ', data.length);
        return response;
    }

    /**
     * Handle response from HTTP Post.  The WFS response is always 200 even when an error.  Parse the response for an
     * exception.  If there is one then log the response and return a 400 error.  If good then return it as-is.
     * @param response
     * @returns Response with JSON body that is the results from the WFS Query
     * @exception Error if the body contains an 'ows:ExceptionReport' (WFS response status is always 200)
     */
    private handleWFSPostResponse(responseXML: Response): Response {
        console.debug('handleWFSPostResponse - start - responseJSON: ', responseXML);

        let wfsResponseXMLBody: any = responseXML.text();
        let wfsResponseJSON: any = this.jsonixService.geodesyMLToJson(wfsResponseXMLBody);
        console.debug('handleWFSPostResponse - wfsReponseJSON: ', wfsResponseJSON);

        if (wfsResponseJSON['ows:ExceptionReport']) {
            console.error('WFS Exception', wfsResponseJSON);
            throw new Error('WFS Exception' + JSON.stringify(wfsResponseJSON));
        } else {
            let options = new ResponseOptions({
                body: wfsResponseJSON,
                status: 200
            });
            return new Response(options);
        }
    }

    /**
     * Escape twice: once for JSON and once for GeoServer.
     */
    private escapeRegEx(s: string): string {
       s = s.replace(/\\/g, '\\\\\\\\');
       s = s.replace(/\"/g, '\\$&');
       return s.replace(/[-\/^$*+?.()|[\]{}]/g, '\\\\$&');
    }

    /**
     * Build a WFS GetFeature request body for the given search parameters
     * @param params: a SelectSiteSearchType object contains site ID and name for searching of CORS sites
     * @returns {string}
     */
    private wfsGetFeatureRequestBody(params: SelectSiteSearchType): Observable<string> {
        let templateArgs = {
            'siteId': params.site4CharId !== undefined ? this.escapeRegEx(params.site4CharId) : '',
            'siteName': params.siteName !== undefined ? this.escapeRegEx(params.siteName) : '',
        };

        return this.http.get('/assets/wfs-search-sites.xml-template')
            .map(response => _.template(response.text())(templateArgs));
    }
}
