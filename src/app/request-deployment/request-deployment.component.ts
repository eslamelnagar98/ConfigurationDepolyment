import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request-deployment',
  templateUrl: './request-deployment.component.html',
  styleUrls: ['./request-deployment.component.css']
})
export class RequestDeploymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  RequestDeployment(requestDeploymentForm: NgForm) {
    console.log(requestDeploymentForm);

  }

}
