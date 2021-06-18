import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Application } from 'src/app/models/Application';
import { ConfigurationService } from 'src/app/Services/configuration.service';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent implements OnInit {

  
  constructor(private configurationService: ConfigurationService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

}
