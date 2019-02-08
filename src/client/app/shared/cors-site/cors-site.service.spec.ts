import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { CorsSiteService } from './cors-site.service';
import { JsonixService } from '../jsonix/jsonix.service';
import { WFSService } from '../wfs/wfs.service';
import { ConstantsService } from '../global/constants.service';
import { SiteAdministrationModel } from '../../site-administration/site-administration-model';

export function main() {
  describe('CorsSite Service', () => {
    let corsSiteService: CorsSiteService;
    let backend: MockBackend;
    let initialResponse: any;
    let fakeWFSService = {
    };


    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        CorsSiteService,
        JsonixService,
        ConstantsService,
        BaseRequestOptions,
        MockBackend,
        {provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {provide: WFSService, useValue: fakeWFSService},
      ]);
      corsSiteService = injector.get(CorsSiteService);
      backend = injector.get(MockBackend);

      let connection: any = undefined;
      backend.connections.subscribe((c: any) => connection = c);
      initialResponse = corsSiteService.getAllCorsSites();
      connection.mockRespond(new Response(new ResponseOptions({ body: '["AAAA", "ALIC"]' })));
    });

    it('should return an Observable when get called', () => {
      expect(initialResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve to list of names when get called', () => {
      let names: any = undefined;
      initialResponse.subscribe((data: any) => names = data);
      expect(names).toEqual(['AAAA', 'ALIC']);
    });

    it('should get the access status of the CORS site being tested', () => {
      let siteAccessList = ['PUBLIC', 'PRIVATE'];
      corsSiteService.getSiteAdministration('ALIC').map((siteAdmin: SiteAdministrationModel) => {
        expect(siteAccessList).toContain(siteAdmin.siteStatus);
      });
    });
  });
}
