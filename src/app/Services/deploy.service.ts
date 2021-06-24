import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Iuploadingmodel } from '../models/iuploadingmodel';
import {catchError,tap} from 'rxjs/operators';
import { Observable, pipe, throwError } from 'rxjs';
import { UploadingFileViewModel } from '../models/UploadingFileViewModel';
@Injectable({
  providedIn: 'root'
})
export class DeployService {
 
  private url = `https://localhost:44320/api/ReplaceDeployment`;
  constructor(private httpClient: HttpClient) { }

  GetFileNames (hubId:number, applicationId:number, ):Observable<string[]>
  {
    return this.httpClient.get<string[]>(`${this.url}/${hubId}/${applicationId}`)
  }
  Deploy(files:File[], hubIds:string, appIds:string, approvedBy:string, DeployedBy:string, RequestedBy:string)
   {
     let auth = `&ApprovedBy=${approvedBy}&DeployedBy=${DeployedBy}&RequestedBy=${RequestedBy}`
     console.log(hubIds)
     console.log(appIds)
     
     /*let x =[
      {
        "idImage": {
          "file": uploadingModel.files
        }
      }
    ];
    let y = {files:[],ApprovedBy:"",DeployedBy:"",RequestedBy:"",HubsApplications:uploadingModel.HubsApplications}
    console.log(y)*/
    //let httpParams = new HttpParams();
    //httpParams.append("hubIDS", "2_2_5");
    let formData = new FormData();
    console.log(files);
    for(let i=0;i<files.length;i++){
      formData.append('files', files[i], files[i].name);
    }
    
    //formData.append('hubsApp', uploadingModel.HubsApplications)

    return this.httpClient.post<void>(`${this.url}?hubIds=${hubIds}&appIds=${appIds}`+auth,formData).pipe(
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
