import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/Checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
const materialComponent: any = [
  MatDialogModule,
  MatTableModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatListModule,
  MatTreeModule,
  MatIconModule,
  ClipboardModule
]
@NgModule({

  declarations: [],

  imports: [

    materialComponent

  ], exports: [

    materialComponent

  ]

})
export class MaterialModule { }