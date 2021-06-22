import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHubapplication } from 'src/app/models/hubapplication';
import { DeployService } from 'src/app/Services/deploy.service';
import { Iuploadingmodel } from 'src/app/models/iuploadingmodel';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-new-deploy',
  templateUrl: './new-deploy.component.html',
  styleUrls: ['./new-deploy.component.css']
})
export class NewDeployComponent implements OnInit {

  constructor(private deployService: DeployService, public dialogRef: MatDialogRef<NewDeployComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hubId: number, applicationId: number }) { }
  fileToUpload: File[] = [];
 //DeletedFiles:string[]=['ahmed.txt','chris.txt'];
 DeletedFiles:string[]=[];
  uploadmodel:Iuploadingmodel={files:[],Deleted:[]}
  filNames:string[]=[];
  selectedName:string[]=[];

  ngOnInit(): void {
    this.deployService.GetFileNames(this.data.hubId,this.data.applicationId).subscribe({
      next:(res)=>{
        this.filNames = res;
        console.log(this.filNames)

      },
      error:(err)=>console.log(err)

    })
  }

  handleFileInput(files: any) {
    console.log("shawky");
    console.log(files);
    console.log(files.files);
    console.log("belal");
    this.fileToUpload = files.files
  }
  handleFileDelete(files: any) {
    
    this.DeletedFiles = files.files
  }
  multipleselectinput(){
    console.log(this.selectedName)

  }
  confirmdeploy()
  {
    this.uploadmodel.files=this.fileToUpload; 
    console.log("hereeeee")
    console.log(this.uploadmodel.files)
    this.uploadmodel.Deleted = this.selectedName; 
    this.deployService.Deploy(this.uploadmodel,this.data.hubId,this.data.applicationId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        this.dialogRef.close();
      }
    })
  }
  /*Deploy() {
    
    this.deployService.Deploy({}, this.data.hubId, this.data.applicationId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        this.dialogRef.close();
      }
     
    }
    )
    console.log("clicked");
  }*/
  // uploadsub(upload:NgForm)
  // {
    
  //   this.deployService.Deploy(upload.value,this.data.hubId,this.data.applicationId).subscribe({
  //         next: (res) => console.log(res),
  //         error: (err) => console.log(err),
  //         complete: () => {
  //           this.dialogRef.close();
  //         }
  //       })
  // }

}
