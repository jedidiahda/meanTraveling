import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Traveling } from '../models/traveling.model';

@Injectable({
  providedIn: 'root'
})
export class TravelingDataService {
  basedUrl:string = environment.basedUrl + "/travelings"
  constructor(private http: HttpClient) { }

  getAll(offset:number,count:number,destination:string):Observable<Traveling[]>{
    return this.http.get<Traveling[]>(`${this.basedUrl}?offset=${offset}&count=${count}&destination=${destination}`);
  }

  getOne(travelingId:string):Observable<Traveling>{
    return this.http.get<Traveling>(`${this.basedUrl}/${travelingId}`);
  }

  createOne(traveling:Traveling):Observable<Traveling>{
    return this.http.post<Traveling>(`${this.basedUrl}`,traveling);
  }

  updateOne(travelingId:string,traveling:Traveling):Observable<Traveling>{
    return this.http.patch<Traveling>(`${this.basedUrl}/${travelingId}`,traveling);
  }

  deleteOne(travelingId:string):Observable<Traveling>{
    return this.http.delete<Traveling>(`${this.basedUrl}/${travelingId}`);
  }

  getTotalDocs(destination:string):Observable<number>{
    return this.http.get<number>(`${this.basedUrl}/totalDocs?destination=${destination}`);
  }
}
