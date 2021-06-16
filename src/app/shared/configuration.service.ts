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
  private applicationsUrl = "Application";
  private hubsWithApplication = "Application/GetAppByhubID";

  async getAllHubs() {
    return await this.MyClient.get<Array<Hub>>(`${this.baseUrl}/${this.hubsUrl}`);
  }

  async getHubApplicationsById(id: number) {
    return await this.MyClient.get<Array<Application>>(`${this.baseUrl}/${this.hubsWithApplication}/${id}`)
  }

  async getAllApplications() {
    return await this.MyClient.get<Array<Application>>(`${this.baseUrl}/${this.applicationsUrl}`)
  }
}
