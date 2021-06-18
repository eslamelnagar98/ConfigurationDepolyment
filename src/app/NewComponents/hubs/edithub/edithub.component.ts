import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HubserviceService } from 'src/app/Services/hubservice.service';

@Component({
  selector: 'app-edithub',
  templateUrl: './edithub.component.html',
  styleUrls: ['./edithub.component.css']
})
export class EdithubComponent implements OnInit, OnDestroy {

  hubname:string="";
  sub:Subscription|undefined;
  constructor(private hubserv:HubserviceService,public dialogRef: MatDialogRef<EdithubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, id:number}) { 
      this.hubname = data.name;
    }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void { 
  }
  edithub()
  {
   this.sub=this.hubserv.UpdateEmployee({ hubID:this.data.id, hubName:this.hubname}).subscribe({
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
