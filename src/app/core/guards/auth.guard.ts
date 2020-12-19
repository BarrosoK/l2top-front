import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '@app/core/store/states/auth.state';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  @Select(AuthState.tokenSelect) token$: Observable<string>;

  constructor(store: Store, private toastr: ToastrService) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.token$.pipe(
        first()
      ).subscribe(token => {
        if (token === undefined) {
          this.toastr.error(`You're not allowed to see this page`, 'Permission denied');
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

}
