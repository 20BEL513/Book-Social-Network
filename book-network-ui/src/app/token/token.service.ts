import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isTokenNotValid() {

    return !this.isTokenValid();
  }
  private isTokenValid() {
    const token: string = this.token;
    if(!token){
      return false;
    }
    //decode the token
    const jwtHelper: JwtHelperService = new JwtHelperService();
    //check expiry date
    const isTokenExpired:boolean|Promise<boolean> = jwtHelper.isTokenExpired(token);
    if(isTokenExpired){
      localStorage.clear();
      return false;
    }
    return true;
  }

  set token(token:string){
    localStorage.setItem('token',token);
  }
  
  get token(){
    return localStorage.getItem('token') as string;
  }
}
