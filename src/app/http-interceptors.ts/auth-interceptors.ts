import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';
import { AccountService } from '../service/account.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const token =  this.accountService.getAuthorizationToken();
        let request : HttpRequest<any> = req;

        if(token && !this.accountService.isTokenExpired(token)) {
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }
    return next.handle(request).pipe(catchError(this.handleError));    
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
       console.error('Ocorreu um erro: ', error.error.message);
    }else{
      console.error(`Código do erro: ${error.error}, ` + `Erro: ${JSON.stringify(error.error)}`) 
    }
    return throwError("Ocorreu um erro, tente novamente");
    }

  
}