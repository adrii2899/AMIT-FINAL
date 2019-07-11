import { Appointment } from '../appointment.type';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  eventoTraido: Appointment;
  constructor(private http: HttpClient) {
   }
   private baseurl = 'http://2.153.125.117:6969/evento';
   /*
   http://2.153.125.117:6969/evento
   http://192.168.1.70:8080/evento 
   */
   private httpHeaders = new HttpHeaders({
     'Content-Type': 'application/json',
   });

   add(event: Appointment, nombreUsuario: string): Observable<Appointment> {
     return this.http.post<Appointment>(this.baseurl + '/add/'+ nombreUsuario , event, {headers: this.httpHeaders})

   }
   update(event: Appointment, nombreUsuario: string): Observable<Appointment> {
    return this.http.put<Appointment>(this.baseurl + '/editar/'+ nombreUsuario , event, {headers: this.httpHeaders})

  }
   prueba2(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.baseurl + '/buscar/' + id , {headers: this.httpHeaders});
     }

     guardarEvento(event?: Appointment) {
       if (event) {
        this.eventoTraido = event;

       }
       return this.eventoTraido;
     }
}
