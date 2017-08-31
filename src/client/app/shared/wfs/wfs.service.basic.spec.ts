import { ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { WFSService, SelectSiteSearchType } from './wfs.service';
import { JsonixService } from '../jsonix/jsonix.service';
import { HttpRequestService } from '../http-request/http-request.service';
import { ConstantsService } from '../global/constants.service';

export function main() {
    describe('WFS Service (basic)', () => {
        let wfsService: WFSService;

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
                    useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]);
            wfsService = injector.get(WFSService);
        });

        it('should be defined', () => {
            expect(wfsService).not.toBeUndefined();
        });

        it('should return Observable from query', () => {
            let siteSearchQuery: SelectSiteSearchType = {siteName: 'ADE1'};
            expect(wfsService.wfsQuery(siteSearchQuery)).toEqual(jasmine.any(Observable));
        });
    });
}
