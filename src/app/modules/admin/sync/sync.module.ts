import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SyncRoutingModule } from './sync-routing.module';
import { ProspectComponent } from './prospect/prospect.component';
import {SharedModule} from '@app/shared/shared.module';
import { OrderComponent } from './order/order.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';


@NgModule({
  declarations: [ProspectComponent, OrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    SyncRoutingModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class SyncModule { }
