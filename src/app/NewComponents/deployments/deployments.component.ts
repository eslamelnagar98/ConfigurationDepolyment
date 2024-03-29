import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeploymentsService } from 'src/app/Services/deployments.service';
import { IDeployment } from 'src/app/models/Deployment';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Deploywithfilesviewmodel } from 'src/app/models/deploywithfilesviewmodel';
import { DeploymentsFilesDetailsComponent } from './deployments-files-details/deployments-files-details.component';
import { data } from 'jquery';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.css']
})
export class DeploymentsComponent implements OnInit {
  Deployments:IDeployment[]=[];
  sub:Subscription|undefined
  constructor(private Depser:DeploymentsService,private matdia:MatDialog) { }

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
  showdetails(depid:Number)
  {
    

   this.matdia.open(DeploymentsFilesDetailsComponent,{height: '94%',
   width: '80%',data:{id:depid}})

     
  }

}
