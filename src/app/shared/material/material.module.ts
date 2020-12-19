import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const materialItems = [
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  DragDropModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatTableModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSortModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatRippleModule,
  MatProgressBarModule
];



@NgModule({
  declarations: [],
  imports: [CommonModule, ...materialItems],
  exports: [...materialItems],
})
export class MaterialModule { }
