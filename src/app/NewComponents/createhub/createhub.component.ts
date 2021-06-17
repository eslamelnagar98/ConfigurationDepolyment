import { Component, OnInit } from '@angular/core';
import { IHub } from 'src/app/models/Hub';
import { FormsModule } from '@angular/forms';
import { HubserviceService } from 'src/app/Services/hubservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-createhub',
  templateUrl: './createhub.component.html',
  styleUrls: ['./createhub.component.css']
})
export class CreatehubComponent implements OnInit {
  hubname:string=""
  sub:Subscription|undefined
  constructor(private hubserv:HubserviceService,private router:Router) { }

  ngOnInit(): void {
  }
  addhub()
  {
   this.sub=this.hubserv.AddHub({hubName:this.hubname}).subscribe({
     next:(res)=>console.log(res),
     error:(err)=>console.log(err),
     complete:()=>this.Navigate()
     
     
   })
  }
    Navigate()
    {
      this.router.navigate(['hubs'])
    }

}
