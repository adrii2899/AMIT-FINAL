import { Usuario } from 'src/app/modal/usuario/usuario';
import { UsuarioService } from '../services/usuario/usuario.service';
import { ChangeDetectionStrategy, SimpleChanges, OnChanges, Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Appointment } from '../appointment.type';
import * as $ from "jquery"
import {Moment} from 'Moment';
import 'fullcalendar';
import { EventsService } from '../services/events.service';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  cargando: boolean;
  events: any = [];
  appointment$: Observable<any[]>;
  eventoss: any = {};
  eventos: any = [];
  datosUsuario: Usuario;
  ngOnInit(): void {
    this.cargando=true;
    console.log(this.cargando);
     this.events = this.usuarioService.eventsUser();
    console.log(this.events)
    this.appointment$ = this.usuarioService.getEvents$();
    this.appointment$.subscribe(event => 
      {
      this.events = event
      this.updateAppointments();});
    setTimeout(()=>{ 
      this.cargando = false; //<<<---    using ()=> syntax
      this.$Instance.fullCalendar({
        selectable: true,
        editable: true,
        eventSources: [{
          events: this.events || [],
        }],
        header: {
          left: this.navButtons.join(','),
          center: 'title',
          right: this.viewModes.join(',')
        },
        select: (start: Moment, end: Moment) => {
          this.requestNewAppointment.emit(this.neutralize({ start: start.format(), end: end.format() }));
        },
        eventClick: (event: Appointment) => {
          this.requestUpdateAppointment.emit(this.neutralize(event));
        },
        eventDrop: (event: Appointment, delta, revert) => {
          this.appointmentUpdated.emit(this.neutralize(event));
        }

      });
     
 }, 3000 );
 
 console.log(this.cargando);
  }
  @Input() viewModes = ['month', 'agendaWeek', 'agendaDay'];
  @Input() navButtons = ['prev', 'next', 'today'];
  @Input() appointments: Appointment[] = [];
  @Output() requestNewAppointment = new EventEmitter<Appointment>();
  @Output() requestUpdateAppointment = new EventEmitter<Appointment>();
  @Output() appointmentUpdated = new EventEmitter<Appointment>();
  @ViewChild('calendar', { static: true }) calendar: ElementRef;
  constructor(private usuarioService: UsuarioService) { 
    this.eventoss = this.events;
  }

  get $Instance(): any {
    return $(this.calendar.nativeElement);
  }

  ngOnDestroy(): void {
    this.$Instance.fullCalendar('destroy');
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.events && simpleChanges.events.currentValue) {
      this.updateAppointments();
    }
  }

  ngAfterViewInit(): void {
  
  }

  private updateAppointments(): void {
    // we have to do it this way, because other wise the plugin is dependent on the 
    // reference of the event source. So we have to remove all event sources and add a new one
    this.$Instance.fullCalendar('removeEventSources', this.$Instance.fullCalendar('getEventSources'));
    this.$Instance.fullCalendar('addEventSource', { events: this.events });
  }

  private neutralize(event: any): any {
    // the widget mutates the appointment in many ways. We can keep it consistent with this function
    if(event.start && event.start._i){
    let startStr = event.start.format();
    let endStr = event.end.format();
    let startArray= startStr.split('T');
    let endArray = endStr.split('T');
    let start = startArray[0];
    let end = endArray[0];
    let startTime = startArray[1];
    let endTime = endArray[1]
    const {  allDay, title, id } = event;
    return { start, end, allDay, title, id , startTime, endTime};
  }
  else{
    let { start, end ,allDay, title, id } = event;
    return { start, end, allDay, title, id };
  }
  }
  
}