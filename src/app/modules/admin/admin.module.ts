import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {SyncModule} from '@app/modules/admin/sync/sync.module';
import { ShapeComponent } from './shape/shape.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AppModule} from '@app/app.module';
import {FilterByIdPipe} from '@app/core/pipes/filter-by-id.pipe';
import { MaskPreviewDialogComponent } from './shape/mask-preview-dialog/mask-preview-dialog.component';
import { DicomComponent } from './dicom/dicom.component';

@NgModule({
  declarations: [HomeComponent, ShapeComponent, FilterByIdPipe, MaskPreviewDialogComponent, DicomComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    SyncModule,
    FlexModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    NgxCsvParserModule,
    ScrollingModule
  ]
})
export class AdminModule { }
