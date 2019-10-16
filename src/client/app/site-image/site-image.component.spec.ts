import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { ApplicationSaveState, ApplicationState, SiteLogService } from '../shared/site-log/site-log.service';
import { DialogService } from '../shared/global/dialog.service';
import { SiteLogViewModel } from '../site-log/site-log-view-model';
import { SiteImageComponent } from './site-image.component';
import { SiteImageModule } from './site-image.module';
import { AssociatedDocumentService } from '../shared/associated-document/associated-document.service';

export function main() {
    describe('Site Image Component', () => {

        let comp: SiteImageComponent;
        let fixture: ComponentFixture<SiteImageComponent>;
        let dom: HTMLElement;

        let fakeSiteLogService = {
            isUserAuthorisedToEditSite: new BehaviorSubject(true),
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
            }
        };

        let fakeDialogService = {
            hasAuthorityToEditSite() {
                return true;
            }
        };

        let fakeAssociatedDocumentService = {
            uploadDocument(documentName: string, file: File): Observable<any> {
                return new Observable((observer: Subscriber<any>) => {
                });
            },

            deleteDocument(documentName: string): Observable<any> {
                return new Observable((observer: Subscriber<any>) => {
                });
            }
        };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    SiteImageModule,
                    FormsModule, ReactiveFormsModule,
                    RouterTestingModule,
                ],
                providers: [
                    {provide: SiteLogService, useValue: fakeSiteLogService},
                    {provide: DialogService, useValue: fakeDialogService},
                    {provide: AssociatedDocumentService, useValue: fakeAssociatedDocumentService},
                ]
            }).compileComponents();  // compile template and css;
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteImageComponent);
            dom = fixture.debugElement.children[0].nativeElement as HTMLElement;

            comp = fixture.componentInstance; // BannerComponent test instance
            comp.siteLogModel = new SiteLogViewModel();
            comp.parentForm = new FormGroup({});
            fixture.detectChanges();
        });

        it('must be defined', () => {
            expect(fixture).toBeDefined();
            expect(comp).toBeDefined();
        });

    });
}
