import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-value-details',
  templateUrl: './show-value-details.component.html',
  styleUrls: ['./show-value-details.component.css']
})
export class ShowValueDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{value:string}) { }

  ngOnInit(): void {
  }

}
