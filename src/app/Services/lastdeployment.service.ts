import { Injectable } from '@angular/core';
import { Lastdeploymentviewmodel } from '../models/lastdeploymentviewmodel';
import { IHub } from '../models/Hub';
import { IHubviewmodel } from '../models/ihubviewmodel';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { IApplication } from '../models/Application';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastdeploymentService {
  private url = `https://localhost:5001/api/LastDeployment`;
  constructor(private http:HttpClient) { }
  Getall():Observable<Lastdeploymentviewmodel[]>
  {
    return  this.http.get<Lastdeploymentviewmodel[]>(this.url);
  }
  
  
/*(Getall():Observable<IHubviewmodel[]>
  {
    return  this.http.get<IHubviewmodel[]>(this.url);
  }*/
  Getappsbyhub(hubid:number):Observable<IApplication[]>
  {
    console.log(`${this.url}/${hubid}`)
    return this.http.get<IApplication[]>(`${this.url}/${hubid}`).pipe(
      tap((res)=>console.log('getting ' + res),catchError(this.handleError))
    )
  }
  private handleError(err:HttpErrorResponse)
  {
  let errormsg='';
  if(err.error instanceof ErrorEvent)
  {
    errormsg=`an error has occured :${err.error.message}}`;
  }else{
   errormsg=  `server return code ${err.status},error message is ${err.message}`;
  }
  console.error(errormsg);
  return throwError(errormsg);
  }
}
