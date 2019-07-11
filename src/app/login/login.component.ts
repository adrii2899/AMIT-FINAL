import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../modal/usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  prueba: any;
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
        this.usuarioService.getEventUsu(usuario.nombreUsuario).subscribe((data) => {
          if(data!=null){
            this.prueba= data  
            sessionStorage.setItem("nombreUsuario", usuario.nombreUsuario);
            this.usuarioService.eventsUser(this.prueba.eventos)
            this.router.navigate(['/calendar']);
            console.log(this.prueba)
          }
          });

      }
      else{alert("error")}
    });

  }
}
