import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  private url = `https://localhost:44320/api/ReplaceDeployment`;
  constructor(private httpClient: HttpClient) { }

  Deploy(hubId: number, applicationId: number, listOfFiles: File[],deletedfiles:File[]) {
   // deletedfiles.push("noow.txt");
    console.log(listOfFiles);
    const formData: FormData = new FormData();
    for (const file of listOfFiles) {
      formData.append('files', file, file.name);
    }
    for (const file of deletedfiles) {
      formData.append('Deleted',file,file.name)
    }

      
    return this.httpClient.post<Observable<any>>(`${this.url}/${hubId}/${applicationId}`, formData)
  }
}
