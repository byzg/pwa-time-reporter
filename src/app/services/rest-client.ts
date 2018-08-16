import * as pluralize from 'pluralize';
import * as _ from 'lodash';

import { ServiceLocator } from './service-locator';
import { HttpClient } from './http-client';

interface IUrlMap {
  index: () => string
  show: (id: number) => string;
  create: () => string;
  update: (id: number) => string;
  destroy: (id: number) => string;
}

export class RestClient {
  static actionTypeMap = {
    index: 'get',
    show: 'get',
    create: 'post',
    update: 'put',
    destroy: 'delete'
  };

  private httpClient: HttpClient = ServiceLocator.injector.get(HttpClient);
  private plural: string;
  private urlMap: IUrlMap;

  constructor(public resourceName: string) {
    this.plural = pluralize(resourceName);
    this.urlMap = {
      index: () => this.plural,
      show: (id: number) => `${this.plural}/${id}`,
      create: () => this.plural,
      update: (id: number) => `${this.plural}/${id}`,
      destroy: (id: number) => `${this.plural}/${id}`
    };
  }

  index() {
    return this.action('index');
  }

  show(id: number) {
    return this.action('show', { id });
  }

  create(attributes) {
    return this.action('create', attributes);
  }

  update(attributes) {
    return this.action('update', attributes);
  }

  destroy(id: number) {
    return this.action('destroy', { id });
  }

  private action(actionName: string, attributes?): Promise<any> {
    const url = this.urlMap[actionName](attributes && attributes.id);
    return this.httpClient[RestClient.actionTypeMap[actionName]](url, _.omit(attributes, 'id'));
  }
}