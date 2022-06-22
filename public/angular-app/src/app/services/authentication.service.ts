import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from '../models/credentials.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  basedUrl:string = environment.basedUrl;
  #authError!:string;
  
  constructor(private http:HttpClient,private jwtService: JwtHelperService) { }

  register(user:Credentials):Promise<Credentials | undefined>{
    return this.http.post<Credentials>(`${this.basedUrl}/users`, user).toPromise();
  }

  login(user:Credentials):Promise<any>{
    return this.http.put<any>(`${this.basedUrl}/users`, user).toPromise();
  }

  logout(){
    localStorage.removeItem(environment.userTokenName);
  }

  setToken(token:any){
    localStorage.setItem(environment.userTokenName,token);
  }

  getToken(): any{
    return localStorage.getItem(environment.userTokenName);
  }

  get name():string{
    let jwtDecode = this.jwtService.decodeToken(this.getToken());
    return jwtDecode ? jwtDecode.name : '';
  }

  get isLoggedIn(): boolean{
    let token = this.getToken();
    return token == null || token == '' ? false : true;
  }

  get authMessage():string{
    return this.#authError;
  }

  set authMessage(err:string){
    this.#authError=err;
  }
}
