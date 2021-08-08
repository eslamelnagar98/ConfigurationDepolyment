import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IApplication } from '../models/Application';
import { IHubapplication } from '../models/hubapplication';


@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor(public http: HttpClient) { }
  private url = "https://localhost:5001/api/Application";



  GetAllApps(): Observable<IApplication[]> {
    return this.http.get<IApplication[]>(this.url).pipe
      (
        tap(data => console.log('all', JSON.stringify(data)))
      )
  }
  GetAppbyid(id: number): Observable<IApplication> {
    return this.http.get<IApplication>(`${this.url}/${id}`)
  }

  getHubApplicationsById(hubId: number): Observable<IHubapplication[]> {
    return this.http.get<IHubapplication[]>(`${this.url}/GetAppByhubID/${hubId}`)
  }

  AddApp(newapp: IApplication): Observable<IApplication> {
    return this.http.post<IApplication>(this.url, newapp, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  UpdateApp(updatedApp: IApplication): Observable<void> {
    return this.http.put<void>(`${this.url}/${updatedApp.appID}`, updatedApp, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      })
    })
      .pipe(
        tap(
          () => console.log("updating element")
        ), catchError(this.handleError)
      )

  }

  DeleteApp(AppId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${AppId}`);
  }

  private handleError(err: HttpErrorResponse) {
    let errormsg = '';
    if (err.error instanceof ErrorEvent) {
      errormsg = `an error has occured :${err.error.message}}`;
    } else {
      errormsg = `server return code ${err.status},error message is ${err.message}`;
    }
    console.error(errormsg);
    return throwError(errormsg);
  }
}
