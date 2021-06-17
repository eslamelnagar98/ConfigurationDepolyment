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
import { ApplicationsComponent } from './NewComponents/applications/applications.component';
import { HubsComponent } from './NewComponents/hubs/hubs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CreatehubComponent } from './NewComponents/createhub/createhub.component';
import { FormsModule } from '@angular/forms';

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
    CreatehubComponent
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
