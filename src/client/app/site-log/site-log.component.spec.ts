import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { User } from 'oidc-client';
import { SiteLogComponent } from './site-log.component';
import { SiteLogModule } from './site-log.module';
import { ApplicationSaveState, ApplicationState, SiteLogService } from '../shared/site-log/site-log.service';
import { DialogService } from '../shared/global/dialog.service';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogViewModel } from '../site-log/site-log-view-model';


export function main() {
    let groupHeaders: string[] = [
        'Site Information',
        'Site Owner',
        'Site Contacts',
        'Site Metadata Custodian',
        'Site Data Centers',
        'Site Data Source',
        'GNSS Receivers',
        'GNSS Antennas',
        'Surveyed Local Ties',
        'Frequency Standards',
        'Collocation Information',
        'Local Episodic Effects',
        'Humidity Sensors',
        'Pressure Sensors',
        'Temperature Sensors',
        'Water Vapor Sensors',
        'Other Instrumentation',
        'Radio Interferences',
        'Signal Obstructions',
        'Multipath Sources',
    ];

    describe('SiteLog Component', () => {
        let siteLogComponent: SiteLogComponent;
        let siteLogComponentFixture: ComponentFixture<SiteLogComponent>;
        let domElement: HTMLElement;

        let fakeActivatedRoute = {
            params: Observable.of({
                id: 'ADE2'
            }),
            data: Observable.of({
                siteLogModel: new SiteLogViewModel(),
            })
        };
        let fakeSiteLogService = {
            isUserAuthorisedToEditSite: new BehaviorSubject(true),
            applicationStateSubject: new Subject(),
            getApplicationState(): Observable<any> {
                return new Observable((observer: Subscriber<any>) => {
                    let applicationState: ApplicationState = {
                        applicationFormModified: false,
                        applicationFormInvalid: false,
                        applicationSaveState: ApplicationSaveState.idle
                    };
                    observer.next(applicationState);
                    observer.complete();
                });
            },
            sendApplicationStateMessage(applicationState: ApplicationState) {
                this.applicationStateSubject.next(applicationState);
            }
        };

        let fakeDialogService = {
            hasAuthorityToEditSite() {
                return true;
            },
            showSuccessMessage(message: string) {},
        };

        let fakeUserAuthService = {
            user: new BehaviorSubject<User | null>(null),
            hasAuthorityToEditSite(siteId: string): Observable<boolean> {
                return Observable.of(true);
            },
            getAuthorisedSites(): string {
                return 'All sites';
            }
        };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    SiteLogModule,
                    FormsModule,
                    ReactiveFormsModule,
                    RouterTestingModule,
                ],
                providers: [
                    {provide: ActivatedRoute, useValue: fakeActivatedRoute},
                    {provide: DialogService, useValue: fakeDialogService},
                    {provide: SiteLogService, useValue: fakeSiteLogService},
                    {provide: UserAuthService, useValue: fakeUserAuthService},
                    {provide: FormBuilder, useValue: new FormBuilder()},
                ]
            }).compileComponents();;
        }));

        beforeEach(() => {
            siteLogComponentFixture = TestBed.createComponent(SiteLogComponent);
            siteLogComponent = siteLogComponentFixture.componentInstance;
            siteLogComponentFixture.detectChanges();
            domElement = siteLogComponentFixture.debugElement.children[0].nativeElement as HTMLElement;
        });

        it('should have Component Fixture and DOM Element defined', () => {
            expect(siteLogComponentFixture).toBeDefined();
            expect(siteLogComponent).toBeDefined();
        });

        it('should have all group headers', () => {
            let groupElements: NodeListOf<Element> = domElement.querySelectorAll('div.group-header>span.panel-title');
            expect(groupElements.length).toBe(groupHeaders.length);
            for(let i = 0; i < groupElements.length; i ++) {
                let title: string = groupElements[i].textContent;
                expect(title).toContain(groupHeaders[i]);
            }
        });
    });
}
