import { IApplication } from 'src/app/models/Application';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editapp',
  templateUrl: './editapp.component.html',
  styleUrls: ['./editapp.component.css']
})
export class EditappComponent implements OnInit {
appname:string=""

  constructor(private appser:AppserviceService,public dialogRef: MatDialogRef<EditappComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: {name: string, id:number}) { 
  this.appname = data.name
    
  }
  ngOnInit(): void {

  }
  editapp()
  {
this.appser.UpdateApp({appName:this.appname,appID:this.data.id}).subscribe({
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
