import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Session } from '../resourses/factories/session';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private session: Session, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/login' && this.session.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    if (state.url !== '/login' && !this.session.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
