import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RollbackService {
  private url = `https://localhost:44320/api/Rollback`;
  constructor(private httpClient: HttpClient) { }

  Rollback(hubId: number, applicationId: number) {
    return this.httpClient.get<Observable<any>>(`${this.url}/${hubId}/${applicationId}`);
  }
}
