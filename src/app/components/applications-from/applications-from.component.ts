import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Application } from 'src/app/models/Application';
import { IHub } from 'src/app/models/Hub';
import { ConfigurationService } from 'src/app/Services/configuration.service';

@Component({
  selector: 'app-applications-from',
  templateUrl: './applications-from.component.html',
  styleUrls: ['./applications-from.component.css']
})
export class ApplicationsFromComponent {
 /* id: number = 0;
  applications: Array<Application> = [];
  constructor(private configurationService: ConfigurationService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.configurationService.getAllApplications().then((res) => res.subscribe(
      (result) => { this.applications = result }
    )).catch((err) => console.log(err));
  }*/

}
