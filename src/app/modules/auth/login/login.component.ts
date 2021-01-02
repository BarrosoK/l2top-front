import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Select, Store} from '@ngxs/store';
import {Logout, Login} from '@app/core/store/actions/auth.actions';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthState} from '@app/core/store/states/auth.state';
import {Observable} from 'rxjs';
import {L2Group} from "@app/types/types";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  get f() { return this.loginForm.controls; }

  @Select(AuthState.isLogged) isLogged$: Observable<boolean>;

  constructor(private authService: AuthService, private toastr: ToastrService,
              private store: Store, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.isLogged$.pipe(
      first()
    ).subscribe(logged => {
        if (logged) {
          this.store.dispatch(new Logout()).pipe(first()).subscribe(() => {
            this.toastr.success('Logout successfully you can now login again');
          });
        }
      });



    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const form = this.loginForm.getRawValue();
    this.authService.login(form.email, form.password)
      .pipe(
        first()
      )
      .subscribe((res: any) => {
        this.store.dispatch(new Login(res)).subscribe(() => {
              this.router.navigateByUrl('/').then(r =>
                  this.toastr.show('You are now logged in!', 'Success')
              );
            }
        );
      }, (err) => {
        this.toastr.error(err.error.message || err.error.errors[0].msg, 'Login');
      });
  }

}
