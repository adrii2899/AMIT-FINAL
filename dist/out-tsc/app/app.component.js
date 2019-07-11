import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.isNew = null;
        this.appointments = [
            {
                id: new Date().getTime().toString(),
                title: 'event1',
                start: new Date()
            }
        ];
    }
    onRequestNewAppointment(e) {
        this.isNew = true;
        this.appointmentDetail = e;
    }
    onRequestUpdateAppointment(e) {
        this.isNew = false;
        this.appointmentDetail = e;
    }
    onCloseAppointmentDetail() {
        this.appointmentDetail = null;
        this.isNew = null;
    }
    onAdd(appointment) {
        this.appointments = [...this.appointments, Object.assign({ id: new Date().getTime().toString() }, appointment)];
        this.onCloseAppointmentDetail();
    }
    onUpdate(appointment) {
        this.appointments = this.appointments.map(a => a.id === appointment.id ? Object.assign({}, a, appointment) : a);
        this.onCloseAppointmentDetail();
    }
    onAppointmentUpdated(appointment) {
        this.onUpdate(appointment);
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'my-app',
        template: `
    <app-calendar [appointments]="appointments" 
      (requestNewAppointment)="onRequestNewAppointment($event)"
      (requestUpdateAppointment)="onRequestUpdateAppointment($event)"
      (appointmentUpdated)="onAppointmentUpdated($event)">
    </app-calendar>
    <app-appointment-detail 
      *ngIf="appointmentDetail" 
      [isNew]="isNew" 
      [appointment]="appointmentDetail" 
      (add)="onAdd($event)"
      (update)="onUpdate($event)"
      (close)="onCloseAppointmentDetail()">
    </app-appointment-detail>
  `,
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map