import { Component, Injectable } from '@angular/core';
import { ConfigurationService } from './shared/configuration.service';
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ConfigurationService]
})
export class AppComponent {
  title = 'ConfigurationDepolyment';
}
