import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LoginRequiredGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authenticationService.isLoggedIn) {
      return true;
    }

    if (!!this.authenticationService.authentication) {
      console.log('sim');
      return this.authenticationService.validateToken()
        .pipe(map((v) => v ? v : this.router.parseUrl('login')));
    }

    return this.router.parseUrl('login');
  }
}
