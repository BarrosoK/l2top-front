import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {HomeComponent} from './modules/home/home.component';
import {AuthGuard} from '@app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'admin',
        canActivateChild: [ /*AuthGuard */],
        loadChildren: './modules/admin/admin.module#AdminModule'
      },
      {
        path: 'servers',
        loadChildren: './modules/servers/servers.module#ServersModule'
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
