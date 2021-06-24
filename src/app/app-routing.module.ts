import { NgModule} from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { AppItemComponent} from './components/app-item/app-item.component';
import { ApplicationsFromComponent } from './components/applications-from/applications-from.component';
import { HomeComponent } from './components/home/home.component';
import { HubsFromComponent } from './components/hubs-from/hubs-from.component';
import { ManageComponent } from './components/manage/manage.component';
import { ApplicationsComponent } from './NewComponents/deployment/applications/applications.component';
import { DeploymentComponent } from './NewComponents/deployment/deployment.component';
import { HubsComponent } from './NewComponents/hubs/hubs.component'
import { Applications2Component } from './NewComponents/apps/applications2/applications2.component';
import { CreateappComponent } from './NewComponents/apps/createapp/createapp/createapp.component';
import { EditappComponent } from './NewComponents/apps/editapp/editapp.component';
import { NewDeploymentComponent } from './NewComponents/new-deployment/new-deployment.component';
import { StringManipulationComponent } from './NewComponents/string-manipulation/string-manipulation.component';


const routes: Routes = [
  { path: 'hubs', component:HubsComponent},
  { path: 'applications', component:Applications2Component},
  { path: 'createapp', component:CreateappComponent},
  { path: 'Deployments', component:NewDeploymentComponent},
  { path: 'stringManipulation', component:StringManipulationComponent},
  //{ path: 'editapp/:id', component:EditappComponent},
  { path: 'deployment', component: DeploymentComponent, children:[
    {path:':id', component:ApplicationsComponent}
  ] },
  { path: 'home', component:HomeComponent },
  { path: 'home/:id',component: HomeComponent},
  { path: 'Manage', component: ManageComponent,children:[
  { path: 'hubsForm', component: HubsFromComponent },
  { path: 'ApplicationForm', component: ApplicationsFromComponent},
  ]}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
