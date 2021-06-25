import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { Deploywithfilesviewmodel } from 'src/app/models/deploywithfilesviewmodel';
import { DeploymentsService } from 'src/app/Services/deployments.service';
import { DeploymentsComponent } from '../deployments.component';

@Component({
  selector: 'app-deployments-files-details',
  templateUrl: './deployments-files-details.component.html',
  styleUrls: ['./deployments-files-details.component.css']
})
export class DeploymentsFilesDetailsComponent implements OnInit {
  
  constructor(private depser:DeploymentsService,
    @Inject(MAT_DIALOG_DATA) public data: { id: Number }) {}
  filesdetails:Deploywithfilesviewmodel[]=[]
  ngOnInit(): void {
    this.depser.Getfiles(this.data.id).subscribe({
      next:(res)=>this.filesdetails=res,
      error:(err)=>console.log(err),
      complete:()=>console.log("done")
    })
    
  }
    
}
