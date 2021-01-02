import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MaterialModule} from './material/material.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FlexLayoutModule} from '@angular/flex-layout';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ServerCardComponent } from './components/server-card/server-card.component';
import { InputComponent } from './components/input/input.component';


@NgModule({
  declarations: [NavigationComponent, ServerCardComponent, InputComponent],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        FlexLayoutModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        NavigationComponent,
        FormsModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        ServerCardComponent,
        InputComponent,
    ]
})
export class SharedModule {
}
