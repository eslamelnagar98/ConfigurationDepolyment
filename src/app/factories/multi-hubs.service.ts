import { Injectable } from '@angular/core';
import { IApplication } from '../models/Application';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { IHubapplication } from '../models/hubapplication';

@Injectable({
  providedIn: 'root'
})
export class MultiHubsService {

  //public applications:IApplication[] =[];
  private hubsApplications:Map<number,IApplication[]> = new Map();

  constructor(private appserviceService: AppserviceService) { }

  public reset(){
    this.hubsApplications.clear();
  }

  public getIntersectApplications(ids:number[]):IApplication[]{
    let apps:IApplication[] =[];
    let count:Map<number,number>= new Map();
    ids.forEach(id => {
      if(!this.hubsApplications.has(id))
        this.set(id).subscribe(
          (data: IHubapplication[]) => {
              this.hubsApplications.set(id, data.map(d=> (d.application!)));
              this.setInersections(ids, apps, count);    
          });
      else{
        this.setInersections(ids, apps, count);
      }
    })


    return apps;
  }

  private set(hubId:number){
    return this.appserviceService.getHubApplicationsById(hubId)
  }

  private setInersections(ids:number[], apps:IApplication[], count:Map<number,number>){
    for (let [key, value] of count.entries()) {
      if(value == ids.length)
        apps.concat(this.hubsApplications.get(key)!);
    }
  }


}
