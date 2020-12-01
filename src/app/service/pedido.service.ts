import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Pedido } from '../model/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }
  
  public getPedido(): Observable<any> {
    return this.http.get<any>(AppConstants.UrlPedidos);
  }

  public postPedido(pedido): Observable<any> {
    return this.http.post<any>(AppConstants.UrlPedidos, pedido);
  }


  public getPedidoId(id): Observable<any> {
    return this.http.get<any>(AppConstants.UrlPedidos + id);
  }
 

  public putPedido(pedido) : Observable<any>{
    return this.http.put<any>(AppConstants.UrlPedidos, pedido);
  }

  public deletPedido(id: Number): Observable<any> {
    return this.http.delete(AppConstants.UrlPedidos + "deletarPedido/" + id, { responseType: 'text' });
  }
  
  public deleteItens(id) : Observable<any>{
    return this.http.delete(AppConstants.UrlPedidos + "removerItens/" + id, {responseType : 'text'});
  }

  public patchStatusAprovado(p): Observable<any> {
    return this.http.patch<any>(AppConstants.UrlPedidos + "aprovaStatus/", p);
  }

  public patchStatusReprovado(r): Observable<any>{
    return this.http.patch<any>(AppConstants.UrlPedidos + "CancelaStatus/", r);
  }
  
}
