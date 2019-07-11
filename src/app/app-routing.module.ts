import { CargarCalendarComponent } from './cargar-calendar/cargar-calendar.component';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    {path: '', component: LoginComponent},
  { path: 'calendar', component: CargarCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
