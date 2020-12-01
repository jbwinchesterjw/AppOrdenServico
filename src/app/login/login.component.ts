import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../service/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {login : '', senha: ''};

  constructor (private loginService  : LoginserviceService, private router : Router){}
  public login(){
    this.loginService.login(this.usuario);
    //console.log("teste login" + this.usuario.login + "senha" + this.usuario.senha);
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null){ 
      this.router.navigate(['home']);
    }
  }

}
