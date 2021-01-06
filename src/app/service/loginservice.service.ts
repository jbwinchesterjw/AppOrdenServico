import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient, private router: Router) { }

  recuperaLogin(login) {

    let user = new Usuario();
    user.login = login;

    return this.http.post(AppConstants.GetUrPath + 'recuperar/', user).subscribe(data => {

      alert(JSON.parse(JSON.stringify(data)).error);

    },
      error => {
        console.error("Erro ao recuperar login");
        alert('Erro ao recuperar login!')
      }
    );
  }

  login(usuario) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario))
      .subscribe(data => {
        var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
        localStorage.setItem("token", token);
        console.info("token :" + localStorage.getItem("token"));
        this.router.navigate(['home']);
      },
        error => {
          console.error("Erro ao fazer login");
          alert("Acesso Negado !");
        }
      );
  }
}
