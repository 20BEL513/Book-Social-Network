import { KeycloackService } from './../keycloack/keycloack.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private keycloackService: KeycloackService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.keycloackService.keycloak.token;

    if (token) {
      const authReq: HttpRequest<any> = request.clone({
        headers: new HttpHeaders( {
          Authorization: `Bearer ${token}`
        })
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
