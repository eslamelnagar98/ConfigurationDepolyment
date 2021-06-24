import { Injectable } from '@angular/core';
import { IApplication } from '../models/Application';
import { AppserviceService } from 'src/app/Services/appservice.service';
import { IHubapplication } from '../models/hubapplication';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiHubsService {

  //public applications:IApplication[] =[];
  private hubsApplications:Map<number,IApplication[]> = new Map();
  private unSubscribes:Subscription[] = [];

  constructor(private appserviceService: AppserviceService) { }

  public reset(){
    this.hubsApplications.clear();
  }

  public getIntersectApplications(HubIds:number[]):IApplication[]{
    let apps:IApplication[] =[];
    let observables:{hubId:number, observable:Observable<IHubapplication[]>}[]=[];
    //let count:Map<number,{ref:IApplication, couner:number}>= new Map();
    console.log(HubIds)
    HubIds.forEach(id => {
      if(!this.hubsApplications.has(id))
        observables.push({hubId:id, observable:this.getObservable(id)});
    });

    console.log(observables.length)
    if(observables.length == 0)
      this.setInersections(HubIds, apps);
    else{
      let counterNewHubLen = 0;
      observables.forEach(observable=>{
        this.unSubscribes.push(observable.observable.subscribe(
            (data: IHubapplication[]) => {
                this.hubsApplications.set(observable.hubId, data.map(d=> (d.application!)));
                counterNewHubLen++;
                if(counterNewHubLen == observables.length)
                  setTimeout(()=>this.setInersections(HubIds, apps),0);
            }))});
    }
    return apps;
  }


  private getObservable(hubId:number){
    return this.appserviceService.getHubApplicationsById(hubId)
  }

  private setInersections(HubIds:number[], apps:IApplication[]){
    this.unSubscribes.forEach(unSubscribe =>{
      unSubscribe.unsubscribe();
    })
    //let apps:IApplication[] = []
    let firstTime:boolean = true;
    HubIds.forEach(hubId=> {
      let tempApplications = this.hubsApplications.get(hubId)!;
      
      console.log(tempApplications)
      if(firstTime){
        tempApplications.forEach(application => apps.push(application));
        firstTime = false;
      }else{
        //if(apps.length >= tempApplications.length){
          for(let i=0; i<apps.length;i++){
            if(!tempApplications.map(a=>a.appID).includes(apps[i].appID)){
              apps.splice(apps.map(a=>a.appID).indexOf(apps[i].appID),1);
              i--;
            }
          }
        /*}else{
          for(let i=0; i<tempApplications.length;i++){
            if(apps.map(a=>a.appID).includes(tempApplications[i].appID)){
              apps.splice(tempApplications.map(a=>a.appID).indexOf(tempApplications[i].appID),1);
            }
          }
        }*/
        
      }
      
    })
    /*for (let [key, value] of this.hubsApplications.entries()) {
      if(HubIds.includes(key))
      value.forEach(application=>{
        let oldCount=count.get(application.appID!)?.couner??0;
        count.set(application.appID!, {ref : application, couner: ++oldCount} );
      })
    }
    
    
    for (let [key, value] of count.entries()) {
      console.log(count)
      if(value.couner == HubIds.length){
        apps.push(value.ref);}
    }*/
    console.log(apps)
  }


}
