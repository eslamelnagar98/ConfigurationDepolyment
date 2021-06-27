import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStringManipulation } from '../models/StringManipulation';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StringManipulationService {
  private url = `https://localhost:44320/api/StringManipulation`;
  constructor(private http: HttpClient) { }

  public getValuesByKey(key:string):Observable<IStringManipulation[][][]>{
    return this.http.get<IStringManipulation[][][]>(this.url+'/'+key);
  }

  public setValuesByKey(stringManipulation:IStringManipulation[], ApprovedBy:string, DeployedBy:string, RequestedBy:string):Observable<void>{
    let url = this.url + '?ApprovedBy='+ ApprovedBy+"&DeployedBy="+DeployedBy+"&RequestedBy="+RequestedBy;
    return this.http.put<void>(url,stringManipulation);
  }

}
