import { Injectable } from '@angular/core';
import { IHub } from '../models/Hub';
import { Observable, throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HubserviceService {
  constructor(public http: HttpClient) { }
  private url = "https://localhost:5001/api/hub";
 

 
  GetAllHubs():Observable<IHub[]>
 {
   return this.http.get<IHub[]>(this.url).pipe
   (
     tap(data=>console.log('all',JSON.stringify(data)))
   )
 }
 GetHubbyid(id:number):Observable<IHub>
 {
   return this.http.get<IHub>(`${this.url}/${id}`)
 }
 AddHub(newhub:IHub):Observable<IHub>
 {
   return this.http.post<IHub>(this.url,newhub,{
     headers:new HttpHeaders({
       'Content-Type':'application/json'
     })}).pipe(
      tap(
      (hub=>  console.log("Creating hub" + hub)
      ),catchError(this.handleError)
      )
     )
   
 }
 UpdateEmployee(updatedhub:IHub):Observable<void>
 {
   return this.http.put<void>(`${this.url}/${updatedhub.hubID}`,updatedhub,{
    headers:new HttpHeaders({ 
   'Content-Type':'application/json'

   })}).pipe(
    tap(
    ()=>  console.log("updating element")
    ),catchError(this.handleError)
  )
 
 }
 
  Deletehub(HubId:number):Observable<void>
  {
    return this.http.delete<void>(`${this.url}/${HubId}`);
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

