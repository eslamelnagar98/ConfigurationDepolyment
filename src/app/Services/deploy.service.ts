import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Iuploadingmodel } from '../models/iuploadingmodel';
import {catchError,tap} from 'rxjs/operators';
import { Observable, pipe, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeployService {
 
  private url = `https://localhost:44320/api/ReplaceDeployment`;
  constructor(private httpClient: HttpClient) { }

  GetFileNames (hubId:number, applicationId:number ):Observable<string[]>
  {
    return this.httpClient.get<string[]>(`${this.url}/${hubId}/${applicationId}`)
  }
  Deploy(uploadingModel:Iuploadingmodel,hubId:number, applicationId:number):Observable<void>
   {
     console.log("debug")
     console.log(uploadingModel)
      
    return this.httpClient.post<void>(`${this.url}/${hubId}/${applicationId}`,uploadingModel).pipe(
      tap(
      ()=>console.log("deploying")
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
