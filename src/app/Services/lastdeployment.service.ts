import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Lastdeploymentviewmodel } from '../models/lastdeploymentviewmodel';
import { HttpClient } from '@angular/common/http';
import { IHub } from '../models/Hub';
import { IHubviewmodel } from '../models/ihubviewmodel';

@Injectable({
  providedIn: 'root'
})
export class LastdeploymentService {
  private url = `https://localhost:44320/api/LastDeployment`;
  constructor(private http:HttpClient) { }
  Getall():Observable<IHubviewmodel[]>
  {
    return  this.http.get<IHubviewmodel[]>(this.url);
  }
}
