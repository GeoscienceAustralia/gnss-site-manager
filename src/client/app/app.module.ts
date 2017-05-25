import { Injector, NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';
import { SiteLogModule } from './site-log/site-log.module';
import { SelectSiteModule } from './select-site/select-site.module';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { AutoHeightDirective } from './shared/global/auto-height.directive';

/*
 * https://stackoverflow.com/questions/34868810/what-is-difference-between-production-and-development-mode-in-angular2
 * https://angular.io/docs/ts/latest/api/core/index/enableProdMode-function.html
 *
 * Development mode - change detection does a second run immediately after the first run and produces an error if any
 * bound value has changed between the first and the second run. This helps to locate bugs where checking values has
 * side-effects or fields or functions don't return the same value on subsequent calls which undermines Angular's change detection.
 *
 * Production mode - disable Angular's development mode, which turns off assertions and other checks (2nd run of change
 * detection as in dev mode) within the framework.
 *
 * Note: 'npm run build.prod' will enable production mode. So this is mainly for local environment.
 */
enableProdMode();

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ModalModule,
    AboutModule,
    SiteLogModule,
    SelectSiteModule,
    UserRegistrationModule,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AutoHeightDirective
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
