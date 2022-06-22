import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportation } from '../models/transportation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportationDataService {
  basedUrl:string=`${environment.basedUrl}/travelings`;
  constructor(private http: HttpClient) { }

  getAll(travelingId:string,offset:number,count:number):Observable<Transportation[]>{
    return this.http.get<Transportation[]>(`${this.basedUrl}/${travelingId}/transportations?offset=${offset}&count=${count}`);
  }

  getTotalDocs(travelingId:string):Observable<number>{
    return this.http.get<number>(`${this.basedUrl}/${travelingId}/transportations/totalDocs`);
  }

  getOne(travelingId:string,tranId:string):Observable<Transportation>{
    return this.http.get<Transportation>(`${this.basedUrl}/${travelingId}/transportations/${tranId}`);
  }

  createOne(travelingId:string,transportation:Transportation){
    return this.http.post<Transportation>(`${this.basedUrl}/${travelingId}/transportations`,transportation);
  }

  updateOne(travelingId:string,tranId:string,transportation:Transportation){
    return this.http.put<Transportation>(`${this.basedUrl}/${travelingId}/transportations/${tranId}`,transportation);
  }

  deleteOne(travelingId:string,tranId:string){
    return this.http.delete<Transportation>(`${this.basedUrl}/${travelingId}/transportations/${tranId}`);
  }
}
