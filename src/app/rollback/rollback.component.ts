import { Component, OnInit } from '@angular/core';
import { LastdeploymentService } from '../Services/lastdeployment.service';
import { Lastdeploymentviewmodel } from '../models/lastdeploymentviewmodel';
import { IHub } from '../models/Hub';
import { IHubviewmodel } from '../models/ihubviewmodel';
@Component({
  selector: 'app-rollback',
  templateUrl: './rollback.component.html',
  styleUrls: ['./rollback.component.css']
})
export class RollbackComponent implements OnInit {
  hubs: IHubviewmodel[] = []
  lastdeployments: Lastdeploymentviewmodel[] = []
  lastdep2: Lastdeploymentviewmodel[] = []
  constructor(private lastdepser: LastdeploymentService) {

  }

  ngOnInit(): void {

    this.lastdepser.Getall().subscribe({
      next: (res) => {
        this.hubs= res,
        console.log(this.hubs)
      },error:(err)=>{
        console.log(err)
      },complete:()=>{
        console.log("done")
      }
    })
  }
  }

