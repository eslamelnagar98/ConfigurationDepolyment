import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IApplication } from 'src/app/models/Application';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { CreateAppComponent } from './create-app/create-app.component';
import { EditAppComponent } from './edit-app/edit-app.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  //currentHubId:number=0;
  constructor(private AppserviceService:AppserviceService, private route:ActivatedRoute, private matdia:MatDialog) {
    route.paramMap.subscribe((d)=> {
      this.AppserviceService.getHubApplicationsById(this.route.snapshot.params['id']).subscribe((data:IApplication[])=> { console.log(data); this.dataSource = new MatTableDataSource(data);})
    });
    //this.currentHubId = this.route.snapshot.params['id'];
    //let hubId = this.route.snapshot.params['id'];
    
   }

   displayedColumns: string[] = ['appID', 'appName', 'edit', 'delete', 'deploy', 'rollback'];
   dataSource:MatTableDataSource<IApplication> = new MatTableDataSource();
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
  ngOnInit(): void {
    
  }

  Insert(){
    this.matdia.open(CreateAppComponent);
  }

  edit(){
    this.matdia.open(EditAppComponent);
  }

}
