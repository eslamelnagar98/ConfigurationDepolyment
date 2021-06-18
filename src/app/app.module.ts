import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/navbar/app-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AppItemComponent } from './components/app-item/app-item.component';
import { ManageComponent } from './components/manage/manage.component';
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


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    AppItemComponent,
    ManageComponent,
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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
    
  ],
  entryComponents:[
    CreatehubComponent,
    EdithubComponent,
    CreateAppComponent,
    EditAppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
