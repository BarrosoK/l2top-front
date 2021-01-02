import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { HomeComponent } from './modules/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AdminModule} from './modules/admin/admin.module';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from './core/store/states/auth.state';
import {AuthModule} from './modules/auth/auth.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ToastrModule} from 'ngx-toastr';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import {JwtInterceptor} from '@app/core/interceptors/jwt.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {ServersModule} from "@app/modules/servers/servers.module";

const config: SocketIoConfig = { url: 'http://167.71.54.249:4242', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    AuthModule,
    ServersModule,
    SocketIoModule.forRoot(config),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([AuthState],
      {developmentMode: true}),
    NgxsStoragePluginModule.forRoot({
      key: 'auth'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
