import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/navbar/app-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AppItemComponent } from './components/app-item/app-item.component';
import { AppDetailsComponent } from './components/app-details/app-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    AppItemComponent,
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
