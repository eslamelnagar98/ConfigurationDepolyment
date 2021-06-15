import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../models/Application';
import { Hub } from '../models/Hub';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(public MyClient: HttpClient) { }
  private baseUrl = "https://localhost:5001";
  private hubsUrl = "api/hub";
  hubs: Array<Hub> = [];
  applications: Array<Application> =
    [
      new Application(1, 'App1', 1),
      new Application(2, 'App1', 2),
      new Application(3, 'App2', 1),
      new Application(4, 'App2', 2),
    ]

  getAllHubs() {
    return this.MyClient.get(`${this.baseUrl}/${this.hubsUrl}`);
  }
  getHubApplicationsById(id: number) {
    return this.applications.filter(P => P.hubId == id).slice();
  }


}
