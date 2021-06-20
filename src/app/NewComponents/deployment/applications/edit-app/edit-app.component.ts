import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IHubapplication } from 'src/app/models/hubapplication';
import { HubapplicationService } from 'src/app/Services/hubapplication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IApplication } from 'src/app/models/Application';
import { AppserviceService } from 'src/app/Services/appservice.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit {
hubapp:IHubapplication={hubID:0,appID:0,assemblyPath:"",backupPath:""}
sub:Subscription|undefined
sub2:Subscription|undefined
apps:IApplication[]=[]

  constructor(private appserv:AppserviceService, private hubappser:HubapplicationService,public dialogRef: MatDialogRef<EditAppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {hubApplication:IHubapplication}) { 
      this.hubapp = data.hubApplication;
      //this.hubapp.appID=data.hubapplication.appID!;
    }
    

  ngOnInit(): void {
this.sub=this.hubappser.Getappbyhub(this.hubapp.hubID,this.hubapp.appID).subscribe({
  next:(res)=>console.log(res),
  error:(err)=>console.log(err),
  complete:()=>console.log("done")
})
this.sub2=this.appserv.GetAllApps().subscribe({
  next:(res)=>this.apps=res,
 error:(err)=>console.log(err)
})
  }
  edithub(hubappform:NgForm)
  {
    console.log(this.hubapp)
    console.log(this.data.hubApplication.hubID + "after destruct 2 ")
    console.log(this.data.hubApplication.hubID + " 3 ")
    console.log({...hubappform.value,hubID:this.data.hubApplication.hubID})
    this.hubappser.Updateapphub(this.hubapp, this.data.hubApplication.appID!).subscribe({
      next:()=>console.log("updated"),
      error:(err)=>console.log(err),
      complete:()=>this.Navigate()
    })
  }
  Navigate()
  {
    
    this.dialogRef.close();
  }
}
