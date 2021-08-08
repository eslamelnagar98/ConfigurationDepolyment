import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
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

  newValue: string = "";

  deployedBy: string = "";
  approvedBy: string = "";
  requestedBy: string = "";
  //mapDataSource:Map<string, Map<number,any[]>>=new Map();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { stringManipulate: any[][][] }, // any is IStringManipulation
    private matDialog: MatDialog, private stringManipulationService: StringManipulationService,
    public dialogRef: MatDialogRef<EditStringManipulationComponent>,) {
    console.log(this.data)

  }
  showDetails(value: string) {
    this.matDialog.open(ShowValueDetailsComponent, {
      height: '90%',
      width: '70%',
      data: { value: value }
    });
  }

  ngOnInit(): void {
  }

  send() {
    let sendStringManipulation: IStringManipulation[] = [];
    this.data.stringManipulate.forEach(value => {
      value.forEach(hubs => {
        hubs.forEach(apps => {
          apps.NewConfigurationResult = this.newValue;
          sendStringManipulation.push(apps);
        })
      })
    })
    this.stringManipulationService.setValuesByKey(sendStringManipulation, this.approvedBy, this.deployedBy, this.requestedBy).subscribe({ complete: () => this.dialogRef.close({ state: true }) });

  }

  public getDataFromClipBoard(event: any): void { //any is ClipboardEvent
    navigator['clipboard'].readText().then((data) => {
      this.newValue = data;
    });
  }

  public getAppNames(list: IStringManipulation[][]): string[] {
    console.log(list.map(hub => hub.map(app => app.AppName)))
    return list.map(hub => hub.map(app => app.AppName)).map(l => l[0]);
  }

}


@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any[][], args?: any): any {
    let list: any[] = [];
    value.forEach(hubs => hubs.forEach(apps => {
      if (!list.map(l => l.appName).includes(apps.appName))
        list.push(apps)
    }))
    return list;
  }
}

@Pipe({
  name: 'displayApps',
  pure: false
})
export class DisplayAppsPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    return value.map(v => " " + v.appName);
  }
}

@Pipe({
  name: 'displayHubs',
  pure: false
})
export class DisplayHubsPipe implements PipeTransform {
  transform(value: any[][], args?: any): any {
    return value.map(v => " " + v[0].hubName);
  }
}
