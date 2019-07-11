import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        imports: [BrowserModule, FormsModule, ReactiveFormsModule],
        declarations: [AppComponent, CalendarComponent, AppointmentDetailComponent],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map