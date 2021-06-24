import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MultiHubsService } from 'src/app/factories/multi-hubs.service';
import { IApplication } from 'src/app/models/Application';
import { IHub } from 'src/app/models/Hub';
import { HubserviceService } from 'src/app/Services/hubservice.service';
import { NewDeployComponent } from '../deployment/applications/new-deploy/new-deploy.component';

@Component({
  selector: 'app-new-deployment',
  templateUrl: './new-deployment.component.html',
  styleUrls: ['./new-deployment.component.css']
})
export class NewDeploymentComponent implements OnInit {

  Hubs:IHub[]=[]
  selectedHubs:IHub[]=[];
  selectApplications :IApplication[]=[];
  passApplications:IApplication[]=[];
  constructor(private hubserviceService:HubserviceService,
              private multiHubsService:MultiHubsService, private matdia:MatDialog) {
    this.multiHubsService.reset();
    this.hubserviceService.GetAllHubs().subscribe(data=> this.Hubs = data);
    //this.Hubs = [{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"},{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"}]
   }

  ngOnInit(): void {
  }
  hubSelected(element:any, hub:IHub){
    this.selectApplications=[];
    let f:boolean=true;
    element.classList.forEach((c:string)=> {
      if(c == "active"){
        element.classList.remove("active");
        this.selectedHubs.splice(this.selectedHubs.map(s=>s.hubID).indexOf(hub.hubID),1);
        f=false;
      }
    })
    if(f){
      element.classList.add("active");
      this.selectedHubs.push(hub);
    }
    //console.log(this.selectedIdHubs);
    this.passApplications = this.multiHubsService.getIntersectApplications(this.selectedHubs.map(s=>s.hubID!));
    
  }

  selectedApplications(applications:IApplication[]){
    this.selectApplications = applications;
  }

  deploy(){
    this.matdia.open(NewDeployComponent,
       {
        height: '90%',
        width: '70%',
         data:{hubs:this.selectedHubs , applications:this.selectApplications}});
    
  }

}
