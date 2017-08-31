import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Rx';
import { ConstantsService } from '../global/constants.service';
import { JsonixService } from '../jsonix/jsonix.service';
import * as _ from 'lodash';

@Injectable()
export class HttpRequestService {

    private webServiceURL: string;

    /**
     * Creates a new HttpRequestService with the injected Http and ConstantsService.
     *
     * @param {Http} http - The injected Http.
     * @param {Http} constantsService - The injected Constants Service.
     * @constructor
     */
    constructor(private http: Http, private constantsService: ConstantsService, private jsonixService: JsonixService) {
        this.webServiceURL = this.constantsService.getWebServiceURL();
    }

    /**
     * Returns an Observable for the HTTP GET request.
     *
     * @param {string} relativePath - the relative path of the request.
     * @param {string} format - date format, default is JSON
     * @return {object[]} the Observable for the HTTP get request.
     */
    public get(relativePath: string, format?: string): Observable<any | any[]> {
        if (format) {
            return this.http.get(this.webServiceURL + '/' + relativePath + '&format=' + format)
                .map((response: Response) => {
                    return this.handleXMLData(response);
                })
                .catch(this.handleError);
        } else {
            return this.http.get(this.webServiceURL + '/' + relativePath)
                .map(this.handleJsonData)
                .catch(this.handleError);
        }
    }

    public getTemplate(path: string, params: any): Observable<string> {
        return this.http.get(path)
            .map(response => _.template(response.text())(params));
    }

    public post(relativePath: string, data: any, options: any): Observable<Response> {
        return this.http.post(this.webServiceURL + '/' + relativePath, data, options)
            .map(this.handleJsonData)
            .catch(this.handleError);
    }

    public postWfsQuery(xmlData: string): Observable<Response> {
        return this.http.post(this.webServiceURL, xmlData)
            .map(this.handleTextData)
            .catch(this.handleError);
    }

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
    */
    public loadJsonObject(jsonFilePath: string): Observable<string[]> {
        return this.http.get(jsonFilePath)
            .map(this.handleJsonData)
            .catch(this.handleError);
    }

    /**
     * handle JSON data
     *
     * @param response
     * @return {Promise<JSON>}
     */
    private handleJsonData(response: Response) {
        return response.json();
    }

    private handleXMLData(response: Response): string {
        if (response.status === 200) {
            return this.jsonixService.geodesyMLToJson(response.text());
        } else {
            throw new Error('Error in http.get: ' + response.url);
        }
    }

    /**
     * Called when no HTTP errors. Simply extract what we need, log as desired and return the response.
     * @param response
     * @returns {Response}
     */
    private handleTextData(response: Response): Response {
        let data: any = response.text();//.json();
        let status: number = response.status;
        let statustext: string = response.statusText;
        console.debug('wfsQuery - status: ' + status + ' status text: ' + statustext + ' data (length): ', data.length);
        return response;
    }

    /**
     * Handle HTTP error
     */
    private handleError(error: any): ErrorObservable {
        let errMsg: string = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        errMsg += error.stack;
        console.error(errMsg);
        return Observable.throw(error.json().error || 'Server error');
    }
}
