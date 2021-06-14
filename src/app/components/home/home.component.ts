import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { Hub } from 'src/app/models/Hub';
import { ConfigurationService } from 'src/app/shared/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hubs: Array<Hub> = [];
  applications: Array<Application> = [];
  id: number = 0;
  constructor(private configurationService: ConfigurationService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.hubs = this.configurationService.getAllHubs();
    this.applications = this.configurationService.getHubApplicationsById(this.id);
    this.routes.params.subscribe(
      (params: Params) => {
        this.applications = this.configurationService.getHubApplicationsById(Number(params['id']));
      }
    );
  }

}
