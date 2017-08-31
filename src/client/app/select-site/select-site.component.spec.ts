import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SelectSiteModule } from './select-site.module';
import { SelectSiteComponent } from './select-site.component';
import { CorsSiteService } from '../shared/http-request/cors-site.service';
import { ServiceWorkerService } from '../shared/index';
import { WFSService } from '../shared/wfs/wfs.service';
import { DialogService } from  '../shared/global/dialog.service';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';

export function main() {
    let originalTimeout: number;
    describe('SelectSite component', () => {
        let config: Route[] = [
            {path: '', component: SelectSiteComponent},
            {path: 'siteLog', component: SelectSiteComponent}
        ];

        let fakeCorsSiteService = {
            getCorsSitesByUsingWFS(fourCharacterId: string, siteName: string): Observable<any> {
                return new Observable((observer: Subscriber<any>) => {
                    observer.next([{fourCharacterId: 'ALIC', name: 'ALICE SPRINGS'}]);
                    observer.complete();
                });
            }
        };
        let fakeWFSService = {
        };

        beforeEach(() => {
          originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

          TestBed.configureTestingModule({
                imports: [FormsModule, RouterModule, HttpModule, SelectSiteModule, RouterTestingModule.withRoutes(config)],
                declarations: [TestComponent],
                providers: [
                    {provide: CorsSiteService, useValue: fakeCorsSiteService},
                    {provide: WFSService, useValue: fakeWFSService},
                    ServiceWorkerService,
                    DialogService,
                    BaseRequestOptions,
                    MockBackend,
                    {
                        provide: Http,
                        useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                            return new Http(backend, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                ]
            });
        });

        it('should have content',
            async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        console.debug('JASMINE originalTimeout: ', originalTimeout);
                        console.debug('JASMINE Timeout now: ', jasmine.DEFAULT_TIMEOUT_INTERVAL);
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();

                        let instance = fixture.debugElement.children[0].componentInstance;
                        // A sanity check that the Component is what we expect
                        expect(instance.cacheItems).toEqual(jasmine.any(Array));
                        let domEl = fixture.debugElement.children[0].nativeElement;

                        // No search has been made and we expect nothing is in this table yet
                        let tableElement = domEl.querySelector('#select-site-sites-table');
                        expect(tableElement).toBeNull();

                        instance.fourCharacterId = 'ALIC';
                        instance.searchSites();

                        fixture.detectChanges();

                        tableElement = domEl.querySelector('#select-site-sites-table');
                        let tableCells: any[] = tableElement.querySelectorAll('td');
                        expect(tableCells.length).toEqual(2);
                        expect(tableCells[0].textContent).toEqual('ALIC');
                    });

            }));

    });
}

@Component({
    selector: 'test-cmp',
    template: '<sd-select-site></sd-select-site>'
})
class TestComponent {
}
