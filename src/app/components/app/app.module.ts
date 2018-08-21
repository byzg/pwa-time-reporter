import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';

import { environment } from '../../../environments/environment';
import { AppRoutingModule } from './app.routing';

import { TPipe } from '../../pipes';
import {
  ServiceLocator,
  HttpHelper,
  Spinner,
  AuthGuard
} from '../../services';

import { Session } from '../../resourses/factories';

import { AppComponent } from './app.component';
import { LoginComponent } from '../../routes';

export function sessionFactory() {
  return new Session();
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  declarations: [
    TPipe,
    AppComponent,
    LoginComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: Session,
      useFactory: sessionFactory,
      deps: []
    },
    HttpHelper,
    AuthGuard,
    Spinner,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
