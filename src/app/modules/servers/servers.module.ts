import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServersRoutingModule } from './servers-routing.module';
import {SharedModule} from "@app/shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    ServersRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class ServersModule { }
