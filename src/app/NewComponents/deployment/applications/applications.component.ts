import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplication } from 'src/app/models/Application';
import { IHubapplication } from 'src/app/models/hubapplication';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { HubapplicationService } from 'src/app/Services/hubapplication.service';
import { RollbackService } from 'src/app/Services/rollback.service';
import { CreateAppComponent } from './create-app/create-app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { NewDeployComponent } from './new-deploy/new-deploy.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  currentHubId: number = 0;
  constructor(private AppserviceService: AppserviceService, private route: ActivatedRoute,
    private matdia: MatDialog,
    private hubappser: HubapplicationService,
    private rollbackService: RollbackService) {
    route.paramMap.subscribe((d) => { this.loaddata() ,
    this.currentHubId = this.route.snapshot.params['id']
    }
    
    )

    //this.currentHubId = this.route.snapshot.params['id'];
    //let hubId = this.route.snapshot.params['id'];

  }
  loaddata() {
    this.AppserviceService.getHubApplicationsById(this.route.snapshot.params['id'])
      .subscribe((data: IHubapplication[]) => { 
        console.log(data); this.dataSource = new MatTableDataSource(data); 
        this.dataSource.filterPredicate = (data: IHubapplication, filterValue: string)=> {
          console.log(data.application!.appName)
          console.log(filterValue)
          return data.application!.appName.toString() /** replace this with the column name you want to filter */
            .trim()
            .toLowerCase().includes(filterValue.trim().toLowerCase()) ;
        };
      })

  }

  //displayedColumns: string[] = ['appID', 'appName', 'edit', 'delete', 'deploy', 'rollback'];
  displayedColumns: string[] = ['appID', 'appName', 'edit', 'delete'];

  dataSource: MatTableDataSource<IHubapplication> = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue)
    this.dataSource.filter = filterValue.trim();
  }
  ngOnInit(): void {
    console.log('this.route.snapshot.params from initializer' + this.route.snapshot.params['id'])
    
  }

  Insert() {
    let ref = this.matdia.open(CreateAppComponent, { data: { hubid: this.currentHubId } });
    let unsub: Subscription = ref.afterClosed().subscribe({ next: () => this.loaddata(), complete: () => unsub.unsubscribe() })

  }

  edit(application: IHubapplication) {
    let ref = this.matdia.open(EditAppComponent, {height:'70%',width:'70%', data: { hubApplication: application } });
    let unSub: Subscription = ref.afterClosed().subscribe({ next: () => this.loaddata(), complete: () => unSub.unsubscribe() })
  }

  delete(id: number) {

    let unSub: Subscription = this.hubappser.Deletehubbyapp(this.currentHubId, id).subscribe({
      next: (res) => console.log(res), error: (err) => console.log(err), complete: () => {
        this.loaddata()
        unSub.unsubscribe()
      }
    });
  }

  Deploy(hubId: number, applicationId: number) {
    let ref = this.matdia.open(NewDeployComponent, { data: { hubId: hubId, applicationId: applicationId } });
  }
  Rollback(hubId: number, applicationId: number) {
   /* this.rollbackService.Rollback(hubId, applicationId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        console.log('done');
      }
    })*/

  }


}
