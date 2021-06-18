import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHub } from 'src/app/models/Hub';
import { FormsModule } from '@angular/forms';
import { HubserviceService } from 'src/app/Services/hubservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createhub',
  templateUrl: './createhub.component.html',
  styleUrls: ['./createhub.component.css']
})
export class CreatehubComponent implements OnInit, OnDestroy {
  hubname:string=""
  sub:Subscription|undefined
  constructor(private hubserv:HubserviceService,public dialogRef: MatDialogRef<CreatehubComponent>) { }

  ngOnInit(): void { 
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  addhub()
  {
   this.sub=this.hubserv.AddHub({hubName:this.hubname}).subscribe({
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
