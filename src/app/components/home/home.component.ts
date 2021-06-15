import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  hubId: number = 0;
  constructor(private configurationService: ConfigurationService, private routes: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.configurationService.getAllHubs().subscribe(
      (res) => {
        this.hubs = res
      },
      (error) => { console.error(error) }
    );
    if (this.id) {
      this.routes.params.subscribe(
        (params: Params) => {
          this.configurationService.getHubApplicationsById(Number(params['id']))
            .subscribe(
              (res) => { this.applications = res }
            )
        }
      );
    }
  }

  // getAllHubApps(id2: number) {
  //   this.configurationService.getHubApplicationsById(id2).subscribe(
  //     (res) => { this.applications = res
  //     console.log(this.applications);}
  //   );
  // }
}
