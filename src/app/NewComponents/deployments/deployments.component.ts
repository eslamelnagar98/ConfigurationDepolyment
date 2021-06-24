import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeploymentsService } from 'src/app/Services/deployments.service';
import { IDeployment } from 'src/app/models/Deployment';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.css']
})
export class DeploymentsComponent implements OnInit {
  Deployments:IDeployment[]=[];
  sub:Subscription|undefined
  constructor(private Depser:DeploymentsService) { }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
   }
 
   ngOnInit(): void {
     this.loadData();
   }

  loadData(){
    console.log("Working");
    this.sub?.unsubscribe();
    this.sub=this.Depser.GetAllDeployment().subscribe({
      next:(res)=>this.Deployments=res,
      error:(err)=>console.log(err),
      complete:()=>console.log("Done")
    })
  }

}
