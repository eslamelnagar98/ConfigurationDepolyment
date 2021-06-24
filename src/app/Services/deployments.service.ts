import { Injectable } from '@angular/core';
import {IDeployment} from '../models/Deployment';
import { Observable, throwError, observable } from 'rxjs';
import {catchError,tap} from 'rxjs/operators';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeploymentsService {


  constructor(public http:HttpClient) { }
  private url = "https://localhost:44320/api/Deployment";
 

  GetAllDeployment():Observable<IDeployment[]>
{
  return this.http.get<IDeployment[]>(this.url).pipe
  (
    tap(data=>console.log('all',JSON.stringify(data)))
  )
}

}




