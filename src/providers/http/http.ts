import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the HttpProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  api: string = 'http://app.toronto.ca/cc_sr_v1_app/data/edc_eventcal_APR';

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }
  
/*
  http.get is used to fetch data from web service and map is used to manipulate data. 
  Json() is called on the response to return data.
*/

getJsonData(){
  return new Promise(resolve => {
    this.http.get(this.api).subscribe(data => {
      resolve(data);
      console.log(data);
    }, err => {
      console.log(err);
     
    });
  });

}

}
