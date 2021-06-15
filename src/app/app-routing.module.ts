import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDetailsComponent } from './components/app-details/app-details.component';
import { AppItemComponent } from './components/app-item/app-item.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'appDetails/:id', component: AppDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
