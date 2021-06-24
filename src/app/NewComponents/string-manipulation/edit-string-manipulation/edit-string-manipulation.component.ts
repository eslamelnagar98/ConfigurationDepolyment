import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHub } from 'src/app/models/Hub';
import { IStringManipulation } from 'src/app/models/StringManipulation';
import { ShowValueDetailsComponent } from './show-value-details/show-value-details.component';

@Component({
  selector: 'app-edit-string-manipulation',
  templateUrl: './edit-string-manipulation.component.html',
  styleUrls: ['./edit-string-manipulation.component.css']
})
export class EditStringManipulationComponent implements OnInit {

  newValue:string="";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{stringManipulate:IStringManipulation[], Info:{hubs:string[], applications:string[], value:string}[]},
    private matDialog:MatDialog) {
    console.log(this.data)
   }
   showDetails(value:string){
     this.matDialog.open(ShowValueDetailsComponent, {height: '90%',
     width: '70%',
     data:{value:value}});
   }

  ngOnInit(): void {
  }

}
