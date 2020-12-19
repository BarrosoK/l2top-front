import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DicomComponent} from './dicom/dicom.component';
import {ShapeComponent} from '@app/modules/admin/shape/shape.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sync',
    loadChildren: './sync/sync.module#SyncModule'
  },
  {
    path: 'shape',
    component: ShapeComponent
  },
  {
    path: 'dicom',
    component: DicomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
