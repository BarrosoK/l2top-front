import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '@app/core/store/states/auth.state';
import {Observable, pipe} from 'rxjs';
import {Logout} from '@app/core/store/actions/auth.actions';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  @Select(AuthState.tokenSelect) token$: Observable<string>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.token$
      .pipe(
        first()
      )
      .subscribe(token => {
      if (token !== undefined) {
        this.store.dispatch(new Logout()).subscribe(() => {
          this.router.navigateByUrl('/');
        });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

}
