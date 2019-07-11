
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { CargarCalendarComponent } from './cargar-calendar/cargar-calendar.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
//material
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
                 MatDialogModule, MatDatepickerModule, AppRoutingModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatTabsModule,MatSelectModule ],
  declarations: [ AppComponent, CalendarComponent, AppointmentDetailComponent, LoginComponent, CargarCalendarComponent ],
  bootstrap:    [ AppComponent ],
  exports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    MatDialogModule, MatDatepickerModule, AppRoutingModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatTabsModule,MatSelectModule ]
})
export class AppModule { }