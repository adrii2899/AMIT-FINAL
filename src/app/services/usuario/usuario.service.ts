
import { Appointment } from '../../appointment.type';

import { Usuario } from '../../modal/usuario/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { 
  public configObservable = new Subject<Appointment>();
  appointment:any = [];
  appointment$ = new Subject<any[]>()
  constructor(private http: HttpClient) { }
  private baseurl = '  http://2.153.125.117:6969/usuario';
  /*
  http://2.153.125.117:6969/evento
  http://192.168.1.70:8080/evento 
  */
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getLogin(u:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.baseurl+ "/login",u,{headers:this.httpHeaders})
  }

  getEventUsu(nombreUsuario:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.baseurl+ "/ver/"+nombreUsuario,{headers:this.httpHeaders})
  }
  eventsUser(event?: any, newEvent?: any, updateEvent?: any){
    if (event) {
      this.appointment = event;
     }
     else if (newEvent){
       this.appointment.push(newEvent);
       this.appointment$.next(this.appointment);

  }
  else if(updateEvent){
    this.appointment.forEach(element => {
      if (element.id === updateEvent.id){
        element.id = updateEvent.id
      element.start = updateEvent.start;
      element.end = updateEvent.end;
      element.allday = updateEvent.allday;
      element.title = updateEvent.title;
      element.backgroundColor = updateEvent.backgroundColor
      this.appointment$.next(this.appointment);
    }
    });
  }
  else{
  return this.appointment;}
}
getEvents$(): Observable<any[]> {
  return this.appointment$.asObservable();
}

}
