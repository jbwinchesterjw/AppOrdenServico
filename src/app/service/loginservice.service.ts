import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http : HttpClient, private router : Router) { }
    login(usuario){
      //console.info(JSON.stringify(usuario));
      return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario))
      .subscribe(data => {
          //console.info(JSON.parse(JSON.stringify(data)))
            var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
            localStorage.setItem("token", token);
            console.info("token :" + localStorage.getItem("token"));
            //alert("login feito !");
            this.router.navigate(['home']);
      },
      error =>{
        console.error("Erro ao fazer login");
          alert("Acesso Negado !");
      }
      );
  }
}
