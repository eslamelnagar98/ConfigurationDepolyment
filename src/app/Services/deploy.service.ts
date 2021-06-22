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

  Deploy(uploadmodel:Iuploadingmodel,hubId:number, applicationId:number):Observable<void>
   {
     console.log("debug")
     console.log(uploadmodel)
   // deletedfiles.push("noow.txt");
    //console.log(listOfFiles);
   /* const formData: FormData = new FormData();
    for (const file of listOfFiles) {
      formData.append('files', file, file.name);
    }
    for (const file of deletedfiles) {
      formData.append('Deleted',file,file.name)
    }*/

      
    return this.httpClient.post<void>(`${this.url}/${hubId}/${applicationId}`,uploadmodel).pipe(
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
