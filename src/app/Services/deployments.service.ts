import { Injectable } from '@angular/core';
import {IDeployment} from '../models/Deployment';
import { Observable, throwError, observable } from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Deploywithfilesviewmodel } from '../models/deploywithfilesviewmodel';

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
    map(res=>{res.forEach(x => {
     
      if(x.deploymentType=='0')
      {
        x.deploymentType='Deployment'
      }else if(x.deploymentType=='1')
      {
        x.deploymentType='Rollback'
      }else if(x.deploymentType=='2')
      {
        x.deploymentType='Configuration'
      }
      else
      {
        x.deploymentType='RollbackConfiguration'
      }
      
       
     })
     return res;
    })
    )
}
Getfiles(deployid:Number) :Observable<Deploywithfilesviewmodel[]>
{
   return this.http.get<Deploywithfilesviewmodel[]>(`${this.url}/${deployid}`).pipe
   (map(res=>{res.forEach(x=>{
     
    if(x.status=='0')
    {
      x.status='added'
    }else if(x.status=='1')
    {
      x.status='Modified'
    }else
    {
      x.status='Deleted'
    }
    
     
   })
   return res;
  }))

  

}

}




