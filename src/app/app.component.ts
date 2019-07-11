
import { Usuario } from './modal/usuario/usuario';
import { UsuarioService } from './services/usuario/usuario.service';
import { Component } from '@angular/core';
import { Appointment } from './appointment.type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login: FormGroup;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.login = this.fb.group({

      nombreUsuario: ['', Validators.required],
      contrasenia:['', Validators.required],


    });
  }
  onSubmit() {
    let usuario:Usuario = this.login.value;
    this.usuarioService.getLogin(usuario).subscribe(data=>{
      usuario = data;
      if(usuario!=null){
        this.router.navigate(['/calendar']);
      }
      else{alert("error")}
    });

  }
}
