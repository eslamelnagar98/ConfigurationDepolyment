import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../models/Application';
import { Hub } from '../models/Hub';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(public MyClient: HttpClient) { }
  private baseUrl = "https://localhost:5001/api";
  private hubsUrl = "hub";
  private url = "https://localhost:5001/api/Application"
  private hubsWithApplication = "Application";

  getAllHubs() {
    return this.MyClient.get<Array<Hub>>(`${this.baseUrl}/${this.hubsUrl}`);
  }
  getHubApplicationsById(app:Application) {
    return this.MyClient.post(`${this.baseUrl}/${this.hubsWithApplication}`,app);
  }


}
