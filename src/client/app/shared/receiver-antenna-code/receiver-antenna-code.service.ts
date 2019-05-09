import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { JsonixService } from '../jsonix/jsonix.service';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';

@Injectable()
export class ReceiverAntennaCodeService implements OnDestroy {

    private static allReceiverCodes: string[] = [];

    private static allAntennaCodes: string[] = [];

    private static allRadomeCodes: string[] = [];

    private unsubscribe: Subject<void> = new Subject<void>();

    /**
     * Creates a new ReceiverAntennaCodeService with injected Http, Jsonix etc.
     * @param {Http} http - Injected Http.
     * @param jsonixService - Injected Service for translating GeodesyML to Json
     * @param constantsService - Constants used in the application
     * @constructor
     */
    constructor(
        private http: Http,
        private jsonixService: JsonixService,
        private constantsService: ConstantsService) {
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Fetch the Receiver-Antenna-Code XML from github and convert to JSON
     * @return {object[]} - The Observable for the HTTP request in JSON format
     */
    public codeXML(): Observable<any> {
        return this.http.get(this.constantsService.getReceiverAntennaCodeURL())
            .map((response: Response) => {
                return this.handleXMLData(response);
            })
            .catch(HttpUtilsService.handleError);
    }

    /**
     * Get IGS Receiver Code list from XML
     * @return {string[]} - The receiver code list
     */
    public receiverCodes(): string[] {
        return ReceiverAntennaCodeService.allReceiverCodes;
    }

    /**
     * Get IGS Antenna Code list from XML
     * @return {string[]} - The antenna code list
     */
    public antennaCodes(): string[] {
        return ReceiverAntennaCodeService.allAntennaCodes;
    }

    /**
     * Get IGS Radome Code list from XML
     * @return {string[]} - The radome code list
     */
    public radomeCodes() {
        return ReceiverAntennaCodeService.allRadomeCodes;
    }

    /**
     * Convert http response in XML format to JSON
     * @param {Response} response - The http response in XML format
     * @return {string} - JSON object
     */
    private handleXMLData(response: Response): string {
        if (response.status === 200) {
            let codeXML: any = response.text();
            let json: any = this.jsonixService.geodesyMLToJson(codeXML);
            for (let codeList of json.CT_CodelistCatalogue.codelistItem) {
                if (codeList.codeListDictionary.CodeListDictionary.id.includes('ReceiverType')) {
                    ReceiverAntennaCodeService.allReceiverCodes =
                        codeList.codeListDictionary.CodeListDictionary.codeEntry.map((entry: any) => {
                            return entry.codeDefinition.CodeDefinition.identifier.value.trim();
                        }).sort();
                }

                if (codeList.codeListDictionary.CodeListDictionary.id.includes('AntennaType')) {
                    ReceiverAntennaCodeService.allAntennaCodes =
                        codeList.codeListDictionary.CodeListDictionary.codeEntry.map((entry: any) => {
                            return entry.codeDefinition.CodeDefinition.identifier.value.trim();
                        }).sort();
                }
            }
            return '';
        } else {
            let message: string = 'Error with GET: ' + response.url;
            throw new Error(message);
        }
    }
}
