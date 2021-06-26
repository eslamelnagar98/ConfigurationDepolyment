import { Component, OnDestroy, OnInit } from '@angular/core';
import { LastdeploymentService } from '../Services/lastdeployment.service';
import { Lastdeploymentviewmodel } from '../models/lastdeploymentviewmodel';
import { IHub } from '../models/Hub';
import { IHubviewmodel } from '../models/ihubviewmodel';
import { Subscription } from 'rxjs';
import { IApplication } from '../models/Application';
import { RollBackViewModel } from '../models/roll-back-view-model';
import { RollbackService } from '../Services/rollback.service';


@Component({
  selector: 'app-rollback',
  templateUrl: './rollback.component.html',
  styleUrls: ['./rollback.component.css']
})
export class RollbackComponent implements OnInit , OnDestroy {
  sub:Subscription|undefined
  sub2:Subscription|undefined
  sub3:Subscription|undefined
  sub4:Subscription|undefined
  lastdeployments: Lastdeploymentviewmodel[] = []
  hubappmap:Map<number,Lastdeploymentviewmodel[]>=new Map()
  rollbackmodellist:RollBackViewModel[]=[]
  rollbackmodel:RollBackViewModel={hubId:0,appID:0,deployedBy:"",approvedBy:"",requestedBy:""}
  deployedBy:string=""
  approvedBy:string=""
  requestedBy:string=""

 
  constructor(private lastdepser: LastdeploymentService,private rollser:RollbackService) {
  }
  ngOnDestroy(): void {
   this.sub2?.unsubscribe()
   this.sub?.unsubscribe()
   this.sub3?.unsubscribe()
   this.sub4?.unsubscribe()
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    if(this.sub)
      this.sub.unsubscribe();
    this.sub= this.lastdepser.Getall().subscribe({next: (res) =>{ 
      this.lastdeployments= res,
       
       res.forEach(x=>{
           if(this.hubappmap.has(x.hubId))
           {
             this.hubappmap.get(x.hubId)?.push(x);
           }else
           {
             this.hubappmap.set(x.hubId,[x])
           }
       })
    },
       error:(err)=>{ console.log(err),
       
        
        alert(err.error)
       },
       complete:()=>{console.log(this.lastdeployments) ,
        console.log(this.hubappmap)
       }
  })
  }
  rollbackapp(app:Lastdeploymentviewmodel)
  {
     this.hubappmap.clear();
     this.rollbackmodellist = [];
     this.rollbackmodel!.hubId=app.hubId;
     this.rollbackmodel!.appID=app.appId;
     this.rollbackmodel.approvedBy=this.approvedBy
     this.rollbackmodel.deployedBy=this.deployedBy
     this.rollbackmodel.requestedBy=this.requestedBy
     this.rollbackmodellist.push(this.rollbackmodel!)
     this.sub2=this.rollser.Rollback(this.rollbackmodellist).subscribe({
       next:()=>console.log("sending to service"),
       error:(err)=>{console.log(err),
        alert.name
        {
          'Warning'
        }
        
        alert(err.error)
    
       },
       complete:()=>{console.log('done');this.loadData();}
     })

  }
  rollbackhub(lastviewmodelist:Lastdeploymentviewmodel[])
  {
    this.hubappmap.clear();
    this.rollbackmodellist = [];
    for(let i=0;i<lastviewmodelist.length;i++)
    {
      let rollbackmodel1:RollBackViewModel={hubId:0,appID:0,deployedBy:"",approvedBy:"",requestedBy:""}
       rollbackmodel1.appID=lastviewmodelist[i].appId
       rollbackmodel1.hubId=lastviewmodelist[i].hubId
       rollbackmodel1.approvedBy=this.approvedBy
       rollbackmodel1.deployedBy=this.deployedBy
       rollbackmodel1.requestedBy=this.requestedBy
      this.rollbackmodellist.push(rollbackmodel1)
     
    }
    this.sub3=this.rollser.Rollback(this.rollbackmodellist).subscribe({
      next:()=>console.log("sending to service"),
      error:(err)=>{console.log(err),
        alert.name
        {
          'Warning'
        }
        
        alert(err.error)
      },
      complete:()=>{console.log('done');this.loadData();}
    })


  }
  rollbacklastdeployment()
  {
    this.hubappmap.clear();
    this.rollbackmodellist = [];
    for(let i=0;i<this.lastdeployments.length;i++)
    {
      let rollbackmodel1:RollBackViewModel={hubId:0,appID:0,deployedBy:"",approvedBy:"",requestedBy:""}
       rollbackmodel1.appID=this.lastdeployments[i].appId
       rollbackmodel1.hubId=this.lastdeployments[i].hubId
       rollbackmodel1.approvedBy=this.approvedBy
       rollbackmodel1.deployedBy=this.deployedBy
       rollbackmodel1.requestedBy=this.requestedBy
      this.rollbackmodellist.push(rollbackmodel1)
     
    }
    this.sub4=this.rollser.Rollback(this.rollbackmodellist).subscribe({
      next:()=>console.log("sending to service"),
      error:(err)=>{console.log(err),
        alert.name
        {
          'Warning'
        }
        
        alert(err.error)
      },
      complete:()=>{console.log('done');this.loadData();}
    })
  }
 
  tt(x:any){
    //console.log(x.parentElement?.parentElement?.parentElement.style)
    //console.log(x.parentElement?.parentElement.nextElementSibling.nextElementSibling)
    if(x.textContent == "chevron_right"){
      x.textContent = "expand_more";
      x.parentElement!.parentElement.nextElementSibling.nextElementSibling.style!.display ="block";
    }else{
      x.textContent = "chevron_right";
      x.parentElement!.parentElement.nextElementSibling.nextElementSibling.style!.display ="none";
    }
  }
  
}

    
      

    
  

