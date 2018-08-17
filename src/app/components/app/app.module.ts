import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { environment } from '../../../environments/environment';
import { AppRoutingModule } from './app.routing';

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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  declarations: [
    AppComponent,
    LoginComponent,
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
