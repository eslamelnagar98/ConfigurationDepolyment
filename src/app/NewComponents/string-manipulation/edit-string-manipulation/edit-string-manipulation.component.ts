import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHub } from 'src/app/models/Hub';
import { IStringManipulation } from 'src/app/models/StringManipulation';
import { StringManipulationService } from 'src/app/Services/string-manipulation.service';
import { ShowValueDetailsComponent } from './show-value-details/show-value-details.component';

@Component({
  selector: 'app-edit-string-manipulation',
  templateUrl: './edit-string-manipulation.component.html',
  styleUrls: ['./edit-string-manipulation.component.css']
})
export class EditStringManipulationComponent implements OnInit {

  newValue:string="";
  mapDataSource:Map<string, Map<number,any[]>>=new Map();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{stringManipulate:IStringManipulation[]},
    private matDialog:MatDialog, private stringManipulationService:StringManipulationService,
    public dialogRef: MatDialogRef<EditStringManipulationComponent>,) {
    console.log(this.data)
    this.data.stringManipulate.forEach(d=>{
      if(this.mapDataSource.has(d.OldConfigurationResult)){
        let seconMap = this.mapDataSource.get(d.OldConfigurationResult)!;
        if(seconMap.has(d.HubID))
          seconMap.get(d.HubID)?.push(d);
        else
          seconMap.set(d.HubID, [d]);
      }else
        this.mapDataSource.set(d.OldConfigurationResult, (new Map()).set(d.HubID, [d]) );
    })
   }
   showDetails(map :Map<number,any[]>){
     console.log(map.values().next().value)
     this.matDialog.open(ShowValueDetailsComponent, {height: '90%',
     width: '70%',
     data:{value:map.values().next().value[0].oldConfigurationResult}});
   }

  ngOnInit(): void {
  }

  send(){
    this.data.stringManipulate.forEach(d=>{
      d.NewConfigurationResult = this.newValue;
    })
    this.stringManipulationService.setValuesByKey(this.data.stringManipulate).subscribe({complete:()=>this.dialogRef.close({state:true})});
  }

  public getDataFromClipBoard(event: any): void { //any is ClipboardEvent
    navigator['clipboard'].readText().then((data) => {
      this.newValue = data;
    });
  }

}
