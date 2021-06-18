import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppserviceService } from 'src/app/Services/appservice.service';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent implements OnInit {

  appname:string=""
  sub:Subscription|undefined
  constructor(private appserv:AppserviceService,public dialogRef: MatDialogRef<CreateAppComponent>) { }

  ngOnInit(): void { 
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  addhub()
  {
   this.sub=this.appserv.AddApp({appName:this.appname}).subscribe({
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
