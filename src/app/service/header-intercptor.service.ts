import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, ignoreElements, tap} from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
  
export class HeaderIntercptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');
    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');

      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(tokenRequest).pipe(
        tap((event : HttpEvent<any>) =>{
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
            //console.info('sucesso na operação');
          }
        })
         ,catchError(this.processaErros));

    } else {
      return next.handle(req);
    }
  }

  constructor() { 
  }

  public processaErros(erro : HttpErrorResponse){
    let errroMessage = 'Erro desconhecido';
    if (erro.error instanceof ErrorEvent ) {
      console.error(erro.error);
      errroMessage = 'Error:'+ erro.error.error;
    } else {
      errroMessage ='Código' + erro.error.code + '\nMensagem: ' + erro.error.error;
    }
    window.alert(errroMessage)
    return throwError(errroMessage);
  }
}

  @NgModule({
    providers : [{
      provide : HTTP_INTERCEPTORS,
      useClass : HeaderIntercptorService,
      multi : true,
    }],
  })

  export class HttpInterceptorModule{

  }


