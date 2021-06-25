import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/navbar/app-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AppItemComponent } from './components/app-item/app-item.component';
import { HubsFromComponent } from './components/hubs-from/hubs-from.component';
import { ApplicationsFromComponent } from './components/applications-from/applications-from.component';
import { AppDetailsComponent } from './components/app-details/app-details.component';
import { ApplicationsComponent } from './NewComponents/deployment/applications/applications.component';
import { HubsComponent } from './NewComponents/hubs/hubs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CreatehubComponent } from './NewComponents/hubs/createhub/createhub.component';
import { FormsModule } from '@angular/forms';
import { EdithubComponent } from './NewComponents/hubs/edithub/edithub.component';
import { DeploymentComponent } from './NewComponents/deployment/deployment.component';
import { CreateAppComponent } from './NewComponents/deployment/applications/create-app/create-app.component';
import { EditAppComponent } from './NewComponents/deployment/applications/edit-app/edit-app.component';
import { Applications2Component } from './NewComponents/apps/applications2/applications2.component';
import { CreateappComponent } from './NewComponents/apps/createapp/createapp/createapp.component';
import { EditappComponent } from './NewComponents/apps/editapp/editapp.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationTransform, HubTransform, NewDeployComponent } from './NewComponents/deployment/applications/new-deploy/new-deploy.component';
import { NewDeploymentComponent } from './NewComponents/new-deployment/new-deployment.component';
import { ApplicationTableComponent } from './NewComponents/new-deployment/application-table/application-table.component';
import { RollbackComponent } from './rollback/rollback.component';
import { GetHubName, GetValue, ShortString, StringManipulationComponent } from './NewComponents/string-manipulation/string-manipulation.component';
import { EditStringManipulationComponent } from './NewComponents/string-manipulation/edit-string-manipulation/edit-string-manipulation.component';
import { ShowValueDetailsComponent } from './NewComponents/string-manipulation/edit-string-manipulation/show-value-details/show-value-details.component';
import { DeploymentsComponent } from './NewComponents/deployments/deployments.component';

import { ManageComponent } from './components/manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    AppItemComponent,
    HubsFromComponent,
    ApplicationsFromComponent,
    AppDetailsComponent,
    ApplicationsComponent,
    HubsComponent,
    CreatehubComponent,
    EdithubComponent,
    DeploymentComponent,
    CreateAppComponent,
    EditAppComponent,
    Applications2Component,
    CreateappComponent,
    EditappComponent,
    NewDeployComponent,
    NewDeploymentComponent,
    ApplicationTableComponent,
    RollbackComponent,
    HubTransform,
    GetHubName,
    ManageComponent,
    
    ApplicationTransform,
    StringManipulationComponent,
    ShortString,
    EditStringManipulationComponent,
    ShowValueDetailsComponent,
    DeploymentsComponent,
    GetValue
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule
    
  ],
  entryComponents:[
    CreatehubComponent,
    EdithubComponent,
    CreateAppComponent,
    EditAppComponent,
    CreateappComponent,
    EditappComponent
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
