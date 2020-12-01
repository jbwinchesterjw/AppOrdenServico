import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient, private router: Router) {
  }

  public getUsuario(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  public getUsuarioListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  public deletUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "deletarUser/" + id, { responseType: 'text' });//id, { responseType: 'text' });
  }

  public deleteTelefone(id) : Observable<any>{
    return this.http.delete(AppConstants.baseUrl + "removerTelefone/" + id, {responseType : 'text'});
  }

  public constarUserPorNome(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);
  }

  public getUserId(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  public updateUser(user): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  public postUser(user): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }
/*
  public postTelefone(fone): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, fone);
  }*/

  

  public userAutenticado() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}
  

