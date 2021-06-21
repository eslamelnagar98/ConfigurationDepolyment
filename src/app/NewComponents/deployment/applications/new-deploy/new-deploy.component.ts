import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHubapplication } from 'src/app/models/hubapplication';
import { DeployService } from 'src/app/Services/deploy.service';

@Component({
  selector: 'app-new-deploy',
  templateUrl: './new-deploy.component.html',
  styleUrls: ['./new-deploy.component.css']
})
export class NewDeployComponent implements OnInit {

  constructor(private deployService: DeployService, public dialogRef: MatDialogRef<NewDeployComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hubId: number, applicationId: number }) { }
  fileToUpload: File[] = [];
  DeletedFiles:File[]=[];

  ngOnInit(): void {
  }

  handleFileInput(files: any) {
    console.log(files.files);
    this.fileToUpload = files.files
  }
  handleFileDelete(files: any) {
    console.log(files.files);
    this.DeletedFiles = files.files
  }
  Deploy() {
    this.deployService.Deploy(this.data.hubId, this.data.applicationId, this.fileToUpload,this.DeletedFiles).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        this.dialogRef.close();
      }
     
    }
    )
    console.log("clicked");
  }

}
