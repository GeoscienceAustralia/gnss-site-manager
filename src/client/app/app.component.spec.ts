import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { Route } from '@angular/router';
import { Http, BaseRequestOptions, ConnectionBackend, HttpModule } from '@angular/http';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { CollapseModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { WFSService } from './shared/wfs/wfs.service';
import { JsonixService } from './shared/jsonix/jsonix.service';
import { ConstantsService } from './shared/global/constants.service';
import { HttpUtilsService } from './shared/global/http-utils.service';
import { UserAuthService } from './shared/global/user-auth.service';

export function main() {

  describe('App component', () => {

    let config: Route[] = [
      { path: 'about', component: AboutComponent }
    ];
    let mockWindow: any = {
        screen: {
        }
    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, HttpModule, CollapseModule.forRoot(), RouterTestingModule.withRoutes(config)],
        declarations: [TestComponent, HeaderComponent, FooterComponent, AppComponent, AboutComponent],
        providers: [
          {provide: APP_BASE_HREF, useValue: '/'},
          {provide: 'Window', useValue: mockWindow},
          MockBackend,
          WFSService,
          JsonixService,
          ConstantsService,
          HttpUtilsService,
          UserAuthService,
          BaseRequestOptions,
          {
            provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})

class TestComponent {
}
