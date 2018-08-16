import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
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
  private observableResponse: Observable<Response>;

  constructor(
    private http: Http,
    private notifications: NotificationsService,
    private method: string,
    private path: string,
    private rawData: Object,
    private opts: Object,
  ) {
    const url = this.url(path, opts['searches']);
    const options = new RequestOptions({
      headers: this.headers,
      withCredentials: true
    });
    const data = humps.decamelizeKeys(rawData);
    this.httpArgs = _.compact([url, data, options]);
  }

  run(): Request {
    this.observableResponse = this.http[this.method](...this.httpArgs);
    return this;
  }

  response(): Promise<any> {
    return this.observableResponse.map(res => humps.camelizeKeys(res.json()))
      .toPromise()
      .catch((reason) => {
        if (reason.status >= 400) {
          this.notifications.error(reason.statusText, reason.json().errors || 'Failure');
        }
      });
  }

  private url(path: string, searches?: Object): string {
    return `${environment.API_URL}/${path}${this.searches(searches)}`;
  }

  private searches(searches?: Object): string {
    return searches ? `?${qs.stringify(
      _.mapValues(humps.decamelizeKeys(searches), val => JSON.stringify(val))
    )}` : '';
  }

  private get headers(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}


@Injectable()
export class HttpClient {
  public _useLoader: boolean = false;

  constructor(
    private http: Http,
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
    const request = new Request(this.http, this.notifications, method, path, rawData, opts);
    this.spinner.isActive = true;
    const result = await request.run().response();
    this.spinner.isActive = false;
    return result
  }
}
