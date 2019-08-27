import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { ConstantsService } from '../global/constants.service';
import { JsonixService } from '../jsonix/jsonix.service';

/**
 * This class provides a http service for retrieving geodesyml codelists from AWS S3 bucket.
 */
@Injectable()
export class GeodesymlCodelistService {

    constructor(private http: Http,
                private jsonixService: JsonixService,
                private constantsService: ConstantsService) {}

    public getCodelist(codeName: string): Observable<string[]> {
        let codelistXml: string = 'GNSS-' + codeName + '-Codelists.xml';
        let url = this.constantsService.getCodelistS3BucketURL() + '/' + codelistXml;
        console.log('Retrieving ' + codeName + ' codelist from ' + url);
        return this.http.get(url)
            .map((response: Response) => {
                let json: any = this.jsonixService.geodesyMLToJson(response.text());
                return this.jsonToCodelist(json);
            })
            .catch(this.handleError);
    }

    private handleError(error: any): ErrorObservable {
        let errorMsg = error.message ? error.message : error.status ?
            error.status + ' - ' + error.statusText : 'Server error';
        let errorBody: string = error._body ? '\n' + error._body : '';
        console.error(errorMsg + errorBody);
        return Observable.throw(errorMsg);
    }

    private jsonToCodelist(json: any): string[] {
        let codelist: string[] = [];
        let codeEntries = json['gmx:CodeListDictionary']['codeEntry'];
        for (let codeEntry of codeEntries) {
            let codeValue: string = codeEntry.codeDefinition['gmx:CodeDefinition'].identifier.value;
            codelist.push(codeValue);
        }
        console.log('Number of codes retrieved: ', codelist.length);
        return codelist;
    }
}
