import { UsuarioService } from '../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment.type';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cargar-calendar',
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
  styleUrls: ['./cargar-calendar.component.css']
})
export class CargarCalendarComponent {
  constructor(private eventService: EventsService,  private usuarioService: UsuarioService, private router: Router){
    this.appointments = this.usuarioService.eventsUser();
  }
  isNew = null;
  appointmentDetail: Appointment;
  appointments: Appointment[] = [
    {
      
    }
  ];

  onRequestNewAppointment(e: Appointment): void {
    this.isNew = true;
    this.appointmentDetail = e;
  }

  onRequestUpdateAppointment(e: Appointment): void {
    this.isNew = false;
    this.appointmentDetail = e;
  }

  onCloseAppointmentDetail(): void {
    this.appointmentDetail = null;
    this.isNew = null;
  }

  onAdd(appointment: Appointment): void {
    // this.appointments = [...this.appointments, { id: new Date().getTime().toString(), ...appointment }];
    
    this.usuarioService.eventsUser(null, appointment)
    this.eventService.add(appointment,sessionStorage.getItem("nombreUsuario")).subscribe()

    this.onCloseAppointmentDetail();

  }

  onUpdate(appointment: Appointment): void {

     this.appointments = this.appointments.map(
        a => a.id === appointment.id ? { ...a, ...appointment } : a,
        this.eventService.update(appointment,sessionStorage.getItem("nombreUsuario")).subscribe()
     );

     this.usuarioService.eventsUser(null, null, appointment)
    // this.appointments.forEach(element => {
    //   if (element.id === appointment.id){
    //     console.log(appointment)
    //   }
      
    // });
    this.onCloseAppointmentDetail();
  }

  onAppointmentUpdated(appointment: Appointment): void {
    this.onUpdate(appointment);
  }
}
