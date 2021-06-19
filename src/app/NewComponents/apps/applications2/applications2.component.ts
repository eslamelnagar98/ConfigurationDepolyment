import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IApplication } from 'src/app/models/Application';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateappComponent } from '../createapp/createapp/createapp.component';
import { EditappComponent } from '../editapp/editapp.component';


@Component({
  selector: 'app-applications2',
  templateUrl: './applications2.component.html',
  styleUrls: ['./applications2.component.css']
})
export class Applications2Component implements OnInit , OnDestroy {
  apps:IApplication[]=[]
  sub:Subscription|undefined
  constructor(private appser:AppserviceService,private madia:MatDialog) { }
 

  ngOnInit(): void {
        this.loaddata()
  }
  
  loaddata()
  {
    this.sub?.unsubscribe();
    this.sub=this.appser.GetAllApps().subscribe({
      next:(res)=>this.apps=res,
      error:(err)=>console.log(err),
      complete:()=>console.log("done")

    })
  }
  ngOnDestroy(): void {
   this.sub?.unsubscribe()
  }
  add()
  {
  let ref=  this.madia.open(CreateappComponent);
  let unsub:Subscription=ref.afterClosed().subscribe({next:()=>this.loaddata(),complete:()=>unsub.unsubscribe()})
    
  }
  edit(name:String,id?:number){
    let ref =this.madia.open(EditappComponent, { data: { name: name, id:id??0 }});
    let unSub:Subscription = ref.afterClosed().subscribe({next:()=> this.loaddata(), complete:()=>unSub.unsubscribe()});
  }
  
  delete(id?:number){
    let unSub:Subscription = this.appser.DeleteApp(id??0).subscribe({next:()=> this.loaddata(), complete:()=>unSub.unsubscribe()});
  }
  

}
