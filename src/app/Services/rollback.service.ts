import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { IApplication } from '../models/Application';
import { RollBackViewModel } from '../models/roll-back-view-model';

@Injectable({
  providedIn: 'root'
})
export class RollbackService {
  private url = `https://localhost:5001/api/Rollback`;
  constructor(private http: HttpClient) { }

  Rollback(rollbackmode:RollBackViewModel[]) :Observable<void>
  {
    return this.http.post<void>(this.url,rollbackmode);
  }
 
}

