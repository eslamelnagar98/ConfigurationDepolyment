import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHubapplication } from 'src/app/models/hubapplication';
import { DeployService } from 'src/app/Services/deploy.service';
import { Iuploadingmodel } from 'src/app/models/iuploadingmodel';
import { NgForm } from '@angular/forms';
import { IHub } from 'src/app/models/Hub';
import { IApplication } from 'src/app/models/Application';


@Component({
  selector: 'app-new-deploy',
  templateUrl: './new-deploy.component.html',
  styleUrls: ['./new-deploy.component.css']
})
export class NewDeployComponent implements OnInit {
  deployedBy:string="";
  requestedBy:string="";
  approvedBy:string="";
  constructor(private deployService: DeployService, public dialogRef: MatDialogRef<NewDeployComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{hubs:IHub[] , applications:IApplication[]}) { }
  fileToUpload: File[] = [];
 //DeletedFiles:string[]=['ahmed.txt','chris.txt'];
 DeletedFiles:string[]=[];
  uploadmodel:Iuploadingmodel={files:[],Deleted:[]}
  filNames:string[]=[];
  selectedName:string[]=[];

  ngOnInit(): void {
    /*this.deployService.GetFileNames(this.data.hubId,this.data.applicationId).subscribe({
      next:(res)=>{
        this.filNames = res;
        console.log(this.filNames)

      },
      error:(err)=>console.log(err)

    })*/
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
    this.dialogRef.close();
    /*this.uploadmodel.files=this.fileToUpload; 
    console.log("hereeeee")
    console.log(this.uploadmodel.files)
    this.uploadmodel.Deleted = this.selectedName; 
    this.deployService.Deploy(this.uploadmodel,this.data.hubId,this.data.applicationId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        this.dialogRef.close();
      }
    })*/
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

@Pipe({name: 'hubTransform'})
export class HubTransform implements PipeTransform {
  transform(value: IHub[]): string[] {
    return value.map(v=> " "+v.hubName);
  }
}

@Pipe({name: 'applicationTransform'})
export class ApplicationTransform implements PipeTransform {
  transform(value: IApplication[]): string[] {
    return value.map(v=> " "+v.appName);
  }
}
