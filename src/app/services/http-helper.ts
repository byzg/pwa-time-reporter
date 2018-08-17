import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import humps from 'humps';
import qs from 'qs';
import * as _ from 'lodash';

import { Spinner } from './spinner';
import { environment } from '../../environments/environment';

class Request {
  private httpArgs: any[];
  private observableResponse: Observable<HttpResponse<any>>;

  constructor(
    private httpClient: HttpClient,
    private notifications: NotificationsService,
    private method: string,
    private path: string,
    private rawData: Object,
    private opts: Object,
  ) {
    const url = this.url(path, opts['searches']);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
    const data = humps.decamelizeKeys(rawData);
    this.httpArgs = _.compact([url, data, options]);
  }

  run(): Request {
    this.observableResponse = this.httpClient[this.method](...this.httpArgs);
    return this;
  }

  response(): Promise<any> {
    return this.run().observableResponse.map(res => humps.camelizeKeys(res))
      .toPromise()
      .catch((reason) => {
        if (reason.status >= 400) {
          this.notifications.error(reason.statusText, reason.json().errors || 'Failure');
        }
      });
  }

  getResponse(): Promise<any> {
    return this.response();
  }

  private url(path: string, searches?: Object): string {
    return `${environment.API_URL}/${path}${this.searches(searches)}`;
  }

  private searches(searches?: Object): string {
    return searches ? `?${qs.stringify(
      _.mapValues(humps.decamelizeKeys(searches), val => JSON.stringify(val))
    )}` : '';
  }
}


@Injectable()
export class HttpHelper {
  public _useLoader = false;

  constructor(
    private httpClient: HttpClient,
    private spinner: Spinner,
    private notifications: NotificationsService
  ) {
  }

  get(path: string, searches?: Object): Promise<any> {
    return this.request('get', path, {}, { searches });
  }

  post(path, rawData, opts = {}): Promise<any> {
    return this.request('post', path, rawData, opts);
  }

  put(path, rawData, opts = {}): Promise<any> {
    return this.request('put', path, rawData, opts);
  }

  destroy(path, rawData, opts = {}): Promise<any> {
    return this.request('delete', path, rawData, opts);
  }

  private async request(method, path, rawData, opts = {}): Promise<any> {
    const request = new Request(this.httpClient, this.notifications, method, path, rawData, opts);
    this.spinner.isActive = true;
    const result: Promise<any> = await request.getResponse();
    this.spinner.isActive = false;
    return result;
  }
}
