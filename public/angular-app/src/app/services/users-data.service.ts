import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  basedUrl:string = environment.basedUrl;
  constructor(private http:HttpClient) { }

  createOne(user:Credentials):Observable<Credentials>{
    return this.http.post<Credentials>(`${this.basedUrl}/users`, user);
  }

  login(user:Credentials):Observable<string>{
    return this.http.put<string>(`${this.basedUrl}/users`, user);
  }
}
