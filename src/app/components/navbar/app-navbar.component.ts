import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  pageTitle:string="EFGhermes"
  constructor() { 
    
  }

  isNavbarCollapsed:boolean=true;
//   navbarCollapsed = true;

// toggleNavbarCollapsing() {
//     this.navbarCollapsed = !this.navbarCollapsed;
// }

  ngOnInit(): void {
  }

}
