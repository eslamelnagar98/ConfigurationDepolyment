import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IApplication } from 'src/app/models/Application';

@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {
  //@Input() 
  apps:IApplication[]=[];
  @Output() selectedApplications:EventEmitter<IApplication[]>= new EventEmitter<IApplication[]>();

  private selectApplications:IApplication[] = [];
  private element:any;
  constructor() {  this.selectedApplications.emit([])}

  ngOnInit(): void {
  }

  select(element:any, application:IApplication){
    this.element = element;
    //console.log(element)
    //console.log(element.nextSibling)
    let f:boolean=true;
    element.classList.forEach((c:string)=> {
      if(c == "active"){
        element.classList.remove("active");
        element.nextSibling?.classList.remove("active");
        element.previousSibling?.classList.remove("active");
        this.selectApplications.splice(this.selectApplications.map(s=>s.appID).indexOf(application.appID),1);
        f=false;
        this.selectedApplications.emit(this.selectApplications);
      }
    })
    if(f){
      element.classList.add("active");
      element.nextSibling?.classList.add("active");
      element.previousSibling?.classList.add("active");
      this.selectApplications.push(application);
      this.selectedApplications.emit(this.selectApplications);
    }
    //console.log(this.selectedIdHubs);
    //this.passApplications = this.multiHubsService.getIntersectApplications(this.selectedIdHubs);
  }

  @Input() set applications(apps:IApplication[]){
    if(this.element){
      this.element.classList.remove("active");
      let nextElement = this.element.nextSibling;
      while(nextElement){
        nextElement?.classList.remove("active");
        nextElement = nextElement.nextSibling;
      }
      let previousElement = this.element.previousSibling;
      while(previousElement){
        previousElement?.classList.remove("active");
        previousElement = previousElement.previousSibling;
      }
    }
    this.apps = [];
    this.selectApplications = [];
    this.apps = apps;
  }
}
