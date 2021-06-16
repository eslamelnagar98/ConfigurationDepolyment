import { NgModule} from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { AppItemComponent} from './components/app-item/app-item.component';
import { ApplicationsFromComponent } from './components/applications-from/applications-from.component';
import { HomeComponent } from './components/home/home.component';
import { HubsFromComponent } from './components/hubs-from/hubs-from.component';
import { ManageComponent } from './components/manage/manage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
