import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Store} from '@ngxs/store';
import {AuthState, AuthStateModel} from '../store/states/auth.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot<string>((state: any) => state.auth.token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.FoaaToJ1MG-D1oDlGozu12jZG82adtA-aPD5zxLRuhg`
      }
    });

    return next.handle(req);
  }
}
