import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers;

    if (this.authenticationService.isLoggedIn) {
      const authentication = this.authenticationService.authentication;

      headers = headers
        .set('userid', authentication!.userId)
        .set('authtoken', authentication!.token);

      // headers = headers
      //   .set('Authorization', `${ authentication!.userId } / ${ authentication!.token }`);
    }

    const req = request.clone({ url: `https://api-core-dev.caronsale.de/api/v1/${ request.url }`, headers });

    return next.handle(req);
  }
}
