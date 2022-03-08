import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LoginRequiredGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {
    return !this.authenticationService.authentication ? this.router.parseUrl('login') : true;
  }
}
