import { Component } from '@angular/core';
import { TestBed, async, } from '@angular/core/testing';
import { RouterModule, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationModule } from './user-registration.module';
import { UserAuthService, UserRegistration } from '../shared/global/user-auth.service';
import { DialogService } from  '../shared/global/dialog.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

export function main() {
    describe('user registration component', () => {
        const config: Route[] = [
            {path: 'userRegistration', component: UserRegistrationComponent},
        ];

        const mockUserService = new (class MockUserService {
            registration: UserRegistration;

            requestNewUser(request: UserRegistration): Observable<void> {
                this.registration = request;
                return Observable.of(undefined);
            }
        })();

        beforeEach(() => {
          TestBed.configureTestingModule({
                imports: [RouterModule, HttpModule, RouterTestingModule.withRoutes(config), UserRegistrationModule],
                declarations: [TestComponent],
                providers: [
                    {provide: UserAuthService, useValue: mockUserService},
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

        it('should pass submitted form data to user service',
            async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        const fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();

                        const component: UserRegistrationComponent =
                            fixture.debugElement.children[0].componentInstance as UserRegistrationComponent;

                        const dom: HTMLElement = fixture.debugElement.children[0].nativeElement as HTMLElement;

                        const formData: UserRegistration = new UserRegistration(
                            'Lazar',
                            'Bodor',
                            'Geoscience Australia',
                            'Software developer',
                            'lazar.bodor@ga.gov.au',
                            '0451061798',
                            'ADE1',
                        );

                        const setValue = (value: string, formControlName: string): void => {
                            let input: HTMLInputElement =
                                dom.querySelector('text-input[formcontrolname=' + formControlName + '] input') as HTMLInputElement;

                            if (!input) {
                                input = dom.querySelector('email-input[formcontrolname='
                                    + formControlName + '] input') as HTMLInputElement;
                            }
                            if (!input) {
                                input = dom.querySelector('textarea-input[formcontrolname='
                                    + formControlName + '] textarea') as HTMLInputElement;
                            }

                            expect(input).toBeTruthy();

                            input.value = value;
                            input.dispatchEvent(new Event('input'));
                        };

                        _.forOwn(formData, setValue);

                        fixture.detectChanges();
                        component.submit();

                        expect(_.isEqual(_.toPlainObject(mockUserService.registration), _.toPlainObject(formData))).toBeTruthy();
                    });
            }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<sd-user-registration></sd-user-registration>'
})
class TestComponent {
}
