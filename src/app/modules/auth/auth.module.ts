import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MDBBootstrapModule.forRoot()

  ]
})
export class AuthModule { }
