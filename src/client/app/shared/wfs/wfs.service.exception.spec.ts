import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WFSService, SelectSiteSearchType } from './wfs.service';
import { JsonixService } from '../jsonix/jsonix.service';
import { HttpRequestService } from '../http-request/http-request.service';
import { ConstantsService } from '../global/constants.service';

export function main() {
    let backend: MockBackend = null;
    let wfsService: WFSService;

    describe('WFS Service (exception)', () => {
        // This XML is not correct - WFS Server rejects it with a 200 response containing
        let exception: string = `<ows:ExceptionReport xmlns:xs="http://www.w3.org/2001/XMLSchema"
                         xmlns:ows="http://www.opengis.net/ows/1.1"
                         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                         version="2.0.0"
                         xsi:schemaLocation="http://www.opengis.net/ows/1.1 http://localhost:8080/geoserver/schemas/ows/1.1.0/owsAll.xsd">
                          <ows:Exception exceptionCode="NoApplicableCode">
                            <ows:ExceptionText>Could not parse the XML for: net.opengis.wfs20.GetFeatureType</ows:ExceptionText>
                          </ows:Exception>
                        </ows:ExceptionReport>`;

        beforeEach(() => {

            let injector = ReflectiveInjector.resolveAndCreate([
                WFSService,
                JsonixService,
                HttpRequestService,
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

        it('should handle a WFS Exception response', () => {
            let siteSearchQuery: SelectSiteSearchType = {siteName: 'ADE1'};
            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: exception
                });
                connection.mockRespond(new Response(options));
            });

            wfsService.wfsQuery(siteSearchQuery).subscribe(
                (response: Response) => {
                    fail('Expecting an Observer error - not a valid response!');
                },
                (error: Error) => {
                    console.log('Error: ', error);
                    expect(error).toBeDefined();
                    expect(error.message).toContain('Error: WFS Exception');
                }
            );
        });

    });
}
