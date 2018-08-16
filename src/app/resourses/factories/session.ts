import { Injectable } from '@angular/core';
// cimport Cookies from 'js-cookie';

import { BaseFactory } from './base-factory';
import { User } from './user';
import { LocalStorage } from '../../services/local-storage';

const tokenKey = 'Auth-Token';

@Injectable()
export class Session extends BaseFactory {
  localStorage = new LocalStorage('currentUser');
  user: User = new User(this.localStorage.pull());
  protected readonly _name: string = 'session';

  isLoggedIn(): boolean {
    return false;
    // const token: string = Cookies.get(tokenKey);
    // return token && token.length > 0;
  }

  create(): Promise<Session> {
    return super.create().then(() => {
      delete this.user.password;
      this.localStorage.push(this.user);
      return this;
    });
  }

  destroy() {
    this.localStorage.remove();
    this.user = new User();
    // Cookies.remove(tokenKey);
  }
}
