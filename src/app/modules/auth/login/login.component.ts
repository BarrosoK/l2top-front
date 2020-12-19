import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Select, Store} from '@ngxs/store';
import {Logout, SaveToken} from '@app/core/store/actions/auth.actions';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthState} from '@app/core/store/states/auth.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Select(AuthState.tokenSelect) token$: Observable<string>;

  username = '';
  password = '';

  constructor(private authService: AuthService, private toastr: ToastrService,
              private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.token$.pipe(
      first()
    ).subscribe(token => {
        if (token !== undefined) {
          this.store.dispatch(new Logout()).pipe(first()).subscribe(() => {
            this.toastr.success('Logout successfully you can now login again');
          });
        }
      });
  }

  login() {
    this.authService.login(this.username, this.password)
      .pipe(
        first()
      )
      .subscribe((res: any) => {
        this.toastr.success('successfully logged in !', 'Login');
        this.store.dispatch(new SaveToken(res.token)).subscribe(() => {
          this.router.navigateByUrl('/');
          }
        );
      }, (err) => {
        this.toastr.error(err.error.message || err.error.errors[0].msg, 'Login');
      });
  }

}
