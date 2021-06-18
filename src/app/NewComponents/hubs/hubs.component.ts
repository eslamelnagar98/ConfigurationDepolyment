import { Component, OnDestroy, OnInit } from '@angular/core';
import { HubserviceService } from 'src/app/Services/hubservice.service';
import { IHub } from 'src/app/models/Hub';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreatehubComponent } from './createhub/createhub.component';
import { EdithubComponent } from './edithub/edithub.component';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css']
})
export class HubsComponent implements OnInit , OnDestroy {
  Hubs:IHub[]=[]
  sub:Subscription|undefined
  constructor(private hubser:HubserviceService,private matdia:MatDialog) { }
  ngOnDestroy(): void {
   this.sub?.unsubscribe()
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    console.log("ssssssssssssss");
    this.sub?.unsubscribe();
    this.sub=this.hubser.GetAllHubs().subscribe({
      next:(res)=>this.Hubs=res,
      error:(err)=>console.log(err),
      complete:()=>console.log("finsihed")
    })
  }

  add()
  {
    let ref = this.matdia.open(CreatehubComponent);
    let unSub:Subscription =ref.afterClosed().subscribe({next:()=> this.loadData(), complete:()=>unSub.unsubscribe()});
  }

  edit(name:string, id?:number){
    let ref =this.matdia.open(EdithubComponent, { data: { name: name, id:id??0 }});
    let unSub:Subscription = ref.afterClosed().subscribe({next:()=> this.loadData(), complete:()=>unSub.unsubscribe()});
  }

  delete(id?:number){
    let unSub:Subscription = this.hubser.Deletehub(id??0).subscribe({next:()=> this.loadData(), complete:()=>unSub.unsubscribe()});
  }
}
