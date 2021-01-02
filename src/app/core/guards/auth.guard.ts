import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '@app/core/store/states/auth.state';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {L2Group} from "@app/types/types";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  @Select(AuthState.isLogged) isLogged$: Observable<boolean>;

  constructor(store: Store, private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.isLogged$.pipe(
        first()
      ).subscribe(logged => {
        if (!logged) {
          this.toastr.error(`You're not allowed to see this page`, 'Permission denied');
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

}
