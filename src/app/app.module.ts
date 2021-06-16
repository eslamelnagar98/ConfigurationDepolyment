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

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    AppItemComponent,
    ManageComponent,
    HubsFromComponent,
    ApplicationsFromComponent,
    AppDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
