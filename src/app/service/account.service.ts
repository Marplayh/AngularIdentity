import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any): Promise<any> {
    try{
      const result = await this.http.post<any>(`${environment.api}/api/Usuario/login`, user).toPromise();
      if(result.access_token) {
        window.localStorage.setItem('token', result.access_token);
        return true;
      }
      return false;
    }catch(err){
      console.error(err);
      return false;
    }
  }

  async cadastrar(usuario: any) {
     const result = await this.http.post(`${environment.api}/api/Usuario/cadastro`, usuario).toPromise();
     return result;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;   
  }

getTokenExpirationDate(token: string): any{
  const decoded:any = jwtDecode(token);
  
  if(decoded.exp === undefined) {
    return null;
  }
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

isTokenExpired(token: string): boolean {
  if(!token){
    return true;
  }
  const date = this.getTokenExpirationDate(token);
  if(date === undefined){
    return false;
  }
  return !(date.valueOf() > new Date().valueOf());
}

isUserLoggedIn(){
  const token = this.getAuthorizationToken();
  if(!token){
    return false;
  }
  else if(this.isTokenExpired(token)){
    return false;
  }
  return true;
}
}
