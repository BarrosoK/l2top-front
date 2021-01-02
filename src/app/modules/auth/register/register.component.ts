import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Select, Store} from '@ngxs/store';
import {Logout, Login} from '@app/core/store/actions/auth.actions';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthState} from '@app/core/store/states/auth.state';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {L2Group} from "@app/types/types";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  get f() { return this.registerForm.controls; }


  @Select(AuthState.tokenSelect) token$: Observable<L2Group.Tokens>;
  @Select(AuthState.userSelect) user$: Observable<L2Group.User>;


  constructor(private authService: AuthService, private toastr: ToastrService,
              private store: Store, private router: Router, private formBuilder: FormBuilder) {
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.token$.pipe(
      first()
    ).subscribe(token => {
        if (token.access.token !== undefined) {
          this.store.dispatch(new Logout()).pipe(first()).subscribe(() => {
            this.toastr.success('Logout successfully you can now register');
          });
        }
      });

    this.registerForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });

  }

  register() {
    console.log(this.registerForm.getRawValue());
    const form = this.registerForm.getRawValue();
    this.authService.register(
        form.pseudo,
        form.email,
        form.password
    ).subscribe(res => {
      console.log(res);

      this.store.dispatch(new Login(res)).subscribe(() => {
        this.router.navigateByUrl('/').then(r =>
            this.toastr.show('You are now logged in!', 'Success')
        );
        }
      );
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, err.error.code);
    })


  }

}
