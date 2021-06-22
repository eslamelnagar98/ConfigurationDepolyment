import { Component, OnInit } from '@angular/core';
import { MultiHubsService } from 'src/app/factories/multi-hubs.service';
import { IHub } from 'src/app/models/Hub';
import { HubserviceService } from 'src/app/Services/hubservice.service';

@Component({
  selector: 'app-new-deployment',
  templateUrl: './new-deployment.component.html',
  styleUrls: ['./new-deployment.component.css']
})
export class NewDeploymentComponent implements OnInit {

  Hubs:IHub[]=[]
  selectedIdHubs:number[]=[];
  constructor(private hubserviceService:HubserviceService, multiHubsService:MultiHubsService) {
    //this.hubserviceService.GetAllHubs().subscribe(data=> this.Hubs = data);
    this.Hubs = [{hubID:1, hubName:"EGYPT"}, {hubID:2, hubName:"KSA"}]
   }

  ngOnInit(): void {
  }
  hubSelected(element:any, id:number){
    let f:boolean=true;
    element.classList.forEach((c:string)=> {
      if(c == "active"){
        element.classList.remove("active");
        this.selectedIdHubs.splice(this.selectedIdHubs.indexOf(id),1);
        f=false;
      }
    })
    if(f){
      element.classList.add("active");
      this.selectedIdHubs.push(id);
    }
    console.log(this.selectedIdHubs);
  }

}
