import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { MatMenuModule} from '@angular/material/menu';
import { IApplication } from 'src/app/models/Application';
import { NgForm } from '@angular/forms';
import { HubapplicationService } from 'src/app/Services/hubapplication.service';
import { IHubapplication } from 'src/app/models/hubapplication';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent implements OnInit {

  appname:string=""
  sub:Subscription|undefined
  apps:IApplication[]=[]
  hubapp:IHubapplication={hubID:0,appID:0,assemblyPath:"",backupPath:""}
  constructor(private appserv:AppserviceService,private hubappser:HubapplicationService,public dialogRef: MatDialogRef<CreateAppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {hubid:number, appsAlreadySelect:number[]}) { 
      this.hubapp.hubID = data.hubid;
    }
    
  

  
    
  ngOnInit(): void { 
  this.sub=this.appserv.GetAllApps().subscribe({
    next:(res)=>this.apps=res.filter(r=> !this.data.appsAlreadySelect.includes(r.appID!) ),
   error:(err)=>console.log(err)
  })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  apphub(hubappform:NgForm)
  {
    hubappform.value.backupPath = hubappform.value.assemblyPath + '\\backups'
    console.log(hubappform.value)
     
        this.hubappser.Addappatpost({...hubappform.value,hubID:this.data.hubid}).subscribe({
          next:(res)=>console.log(res),
          error:(err)=>console.log(err),
          complete:()=>this.Navigate()
        })
  }
 
    Navigate()
    {
      
      this.dialogRef.close();
    }

}
