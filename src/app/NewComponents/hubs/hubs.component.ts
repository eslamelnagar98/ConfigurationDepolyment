import { Component, OnDestroy, OnInit } from '@angular/core';
import { HubserviceService } from 'src/app/Services/hubservice.service';
import { IHub } from 'src/app/models/Hub';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreatehubComponent } from '../createhub/createhub.component';

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
    this.sub=this.hubser.GetAllHubs().subscribe({
      next:(res)=>this.Hubs=res,
      error:(err)=>console.log(err),
      complete:()=>console.log("finsihed")
    })
  }
  add()
  {
    this.matdia.open(CreatehubComponent)
  }
}
