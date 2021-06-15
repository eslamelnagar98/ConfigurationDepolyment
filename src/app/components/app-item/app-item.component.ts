import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { ConfigurationService } from 'src/app/shared/configuration.service';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent implements OnInit {

  id: number = 0;
  applications: any = [];
  constructor(private configurationService: ConfigurationService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.configurationService.getHubApplicationsById(new Application(this.id,'aaa')).subscribe(
      (res) => {this.applications = res},
      (err) => console.error(err)
    );
  }

}
