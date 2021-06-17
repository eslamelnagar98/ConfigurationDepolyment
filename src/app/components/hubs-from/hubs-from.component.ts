import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHub } from 'src/app/models/Hub';
import { ConfigurationService } from 'src/app/Services/configuration.service';

@Component({
  selector: 'app-hubs-from',
  templateUrl: './hubs-from.component.html',
  styleUrls: ['./hubs-from.component.css']
})
export class HubsFromComponent  {

 /* id: number = 0;
  hubs: Array<Hub> = [];
  constructor(private configurationService: ConfigurationService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.configurationService.getAllHubs().then((res) => res.subscribe(
      (result) => { this.hubs = result }
    )).catch((err) => console.log(err));
  }
*/
}
