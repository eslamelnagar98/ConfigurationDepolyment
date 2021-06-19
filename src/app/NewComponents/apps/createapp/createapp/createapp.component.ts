import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-createapp',
  templateUrl: './createapp.component.html',
  styleUrls: ['./createapp.component.css']
})
export class CreateappComponent implements OnInit {
  appName:string=""
  sub:Subscription|undefined

  constructor(private appsr:AppserviceService,public dialogRef: MatDialogRef<CreateappComponent>) { }

  ngOnInit(): void {
  }
  addapp()
  {
    this.sub=this.appsr.AddApp({appName:this.appName}).subscribe({
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
