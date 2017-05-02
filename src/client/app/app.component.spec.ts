import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import {
  async
} from '@angular/core/testing';
import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { CollapseModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Http, BaseRequestOptions, ConnectionBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
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
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, HttpModule, CollapseModule.forRoot(), RouterTestingModule.withRoutes(config)],
        declarations: [TestComponent, ToolbarComponent, FooterComponent, AppComponent, AboutComponent],
        providers: [
          {provide: APP_BASE_HREF, useValue: '/'},
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
