import { Injectable } from '@angular/core';
import { Hub } from '../models/Hub';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  hubs:Array<Hub> =[];
  constructor() { }

  getAllHubs(){

  }
}
