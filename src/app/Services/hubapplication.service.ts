import { Injectable } from '@angular/core';
import { IHub } from '../models/Hub';
import { Observable, throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { IHubapplication } from '../models/hubapplication';

@Injectable({
  providedIn: 'root'
})
export class HubapplicationService {
  hubid:number=0
  appid:number=0
  private url = `https://localhost:44320/api/hubsApplication`;



  constructor(public http: HttpClient) { }
  Getappbyhub(hubid:number,appid:number):Observable<IHubapplication>
 {
  this.hubid=hubid;
  this.appid=appid;   

   return this.http.get<IHubapplication>(`${this.url}/${this.hubid}/${this.appid}`)
 }
  Addappatpost(newapphub:IHubapplication):Observable<IHubapplication>
  {
    console.log(newapphub);
    this.hubid=newapphub.hubID;
    this.appid=newapphub.appID;
    return this.http.post<IHubapplication>(`${this.url}/${this.hubid}/${this.appid}`,newapphub,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
    })}).pipe(
      tap(
      (app=>  console.log("Creating app" + app)
      ),catchError(this.handleError)
      )
     )
   
 }
 Deletehubbyapp(hubid:number,appid:number):Observable<IHubapplication>
  {


   this.hubid=hubid;
   this.appid=appid;   

    return this.http.delete<IHubapplication>(`${this.url}/${this.hubid}/${this.appid}`);
  }
  Updateapphub(updatedapp:IHubapplication,routeid:number):Observable<void>
 {
   console.log(updatedapp)
   this.hubid=updatedapp.hubID;
   this.appid=routeid;
   return this.http.put<void>(`${this.url}/${this.hubid}/${this.appid}`,updatedapp,{
    headers:new HttpHeaders({ 
   'Content-Type':'application/json'

   })}).pipe(
    tap(
    ()=>  console.log("updating element")
    ),catchError(this.handleError)
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
