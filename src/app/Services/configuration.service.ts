import { Injectable } from '@angular/core';
import { Application } from '../models/Application';
import { IHub } from '../models/Hub';
import { Observable, throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(public http: HttpClient) { }
  private url = "https://localhost:44320/api/hub";
  private hubsUrl = "hub";
  private applicationsUrl = "Application";
  private hubsWithApplication = "Application/GetAppByhubID";

 
  GetAllHubs():Observable<IHub[]>
 {
   return this.http.get<IHub[]>(this.url).pipe
   (
     tap(data=>console.log('all',JSON.stringify(data)))
   )
 }

  /*async getHubApplicationsById(id: number) {
    return await this.MyClient.get<Array<Application>>(`${this.baseUrl}/${this.hubsWithApplication}/${id}`)
  }

  async getAllApplications() {
    return await this.MyClient.get<Array<Application>>(`${this.baseUrl}/${this.applicationsUrl}`)
  }*/
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
