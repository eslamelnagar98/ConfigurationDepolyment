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
  id: number = 0;
  applications: Array<Application> = [];
  constructor(private configurationService: ConfigurationService, private routes: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.id = this.routes.snapshot.params['id'];
    this.configurationService.getAllHubs().then((res) => res.subscribe(
      (result) => { this.hubs = result }
    )).catch((err) => console.log(err));

    if (this.id) {
      this.routes.params.subscribe(
        (params: Params) => {
          this.configurationService.getHubApplicationsById(Number(params['id'])).then(
            (res)=>res.subscribe(
              (result)=>{this.applications=result}
            )
          )
        }
      );
    }
  }
}
