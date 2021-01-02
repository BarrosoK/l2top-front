import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateComponent} from "@app/modules/servers/create/create.component";
import {AuthGuard} from "@app/core/guards/auth.guard";


const routes: Routes = [
  {
    path: 'add',
    canActivate: [AuthGuard],
    component: CreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServersRoutingModule { }
