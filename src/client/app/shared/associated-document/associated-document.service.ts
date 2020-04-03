import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { User } from 'oidc-client';

import { ConstantsService } from '../global/constants.service';
import { UserAuthService } from '../global/user-auth.service';

/**
 * This class provides a http service for uploading/deleting associated documents to/from data storage.
 */
@Injectable()
export class AssociatedDocumentService {

    private resourceUrl: string;

    /**
    * @constructor
    */
    constructor(private http: Http,
                private constantsService: ConstantsService,
                private userAuthService: UserAuthService) {
        this.resourceUrl = this.constantsService.getWebServiceURL() + '/associatedDocuments/';
    }

    public uploadDocument(documentName: string, file: File): Observable<Response> {
        let data = new FormData();
        data.set('file', file, documentName);
        return this.http.post(this.resourceUrl, data, {headers: this.getHttpHeaders()})
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError);
    }

    public deleteDocument(documentName: string): Observable<Response> {
        return this.http.delete(this.resourceUrl + documentName, {headers: this.getHttpHeaders()})
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError);
    }

    private getHttpHeaders(): Headers {
        const user: User = this.userAuthService.user.value;
        const headers = new Headers();
        if (user) {
            headers.append('Authorization', 'Bearer ' + user.id_token);
        }

        return headers;
    }

    private handleError(error: any): ErrorObservable {
        let errorMsg = error.message ? error.message : error.status ?
            error.status + ' - ' + error.statusText : 'Server error';
        let errorBody = error._body ? '\n' + error._body : '';
        console.error(errorMsg + errorBody);
        return Observable.throw(errorMsg);
    }
}
