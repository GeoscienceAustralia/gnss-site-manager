import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WFSService, SelectSiteSearchType } from './wfs.service';
import { JsonixService } from '../jsonix/jsonix.service';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';

export function main() {
    let backend: MockBackend = null;
    let wfsService: WFSService;

    describe('WFS Service (valid)', () => {
        let validResponse: string = `<?xml version="1.0" encoding="UTF-8"?>
<wfs:FeatureCollection xmlns:wfs="http://www.opengis.net/wfs/2.0" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.5" 
    xmlns:gml="http://www.opengis.net/gml/3.2" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    numberMatched="unknown" numberReturned="1" 
    timeStamp="2016-09-28T22:25:28.703Z" 
    xsi:schemaLocation="http://www.opengis.net/wfs/2.0 
        http://localhost:8080/geoserver/schemas/wfs/2.0/wfs.xsd 
        urn:xml-gov-au:icsm:egeodesy:0.5 
        http://schemas.ga.gov.au/geodesyml/0.3/geodesyML.xsd 
        http://www.opengis.net/gml/3.2 
        http://localhost:8080/geoserver/schemas/gml/3.2.1/gml.xsd">
    <wfs:member>
        <geo:Site gml:id="Site.14252">
            <gml:identifier codeSpace="urn:xml-gov-au:icsm:egeodesy:0.5:SiteIdentifier">ADE1</gml:identifier>
            <gml:name codeSpace="urn:xml-gov-au:icsm:egeodesy:0.5:SiteName">Australia NGA collocated</gml:name>
            <geo:type codeSpace="urn:xml-gov-au:icsm:egeodesy:0.5:SiteType">CORS</geo:type>
        </geo:Site>
    </wfs:member>
</wfs:FeatureCollection>`;

        beforeEach(() => {

            let injector = ReflectiveInjector.resolveAndCreate([
                WFSService,
                JsonixService,
                ConstantsService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function (backend: MockBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]);
            wfsService = injector.get(WFSService);
            backend = injector.get(MockBackend);
        });

        it('should return a valid response when no exception', () => {
            let siteSearchQuery: SelectSiteSearchType = {siteName: 'ADE1'};
            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: validResponse
                });
                connection.mockRespond(new Response(options));
            });

            wfsService.wfsQuery(siteSearchQuery).subscribe(
                (wfsQueryData: any) => {
                    expect(wfsQueryData).toBeDefined();
                    expect(wfsQueryData.length).toBe(1);
                },
                (error: Error) => HttpUtilsService.handleError
            );
        });

    });
}
