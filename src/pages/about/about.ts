import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'

})
export class AboutPage {

 
result:any;

  constructor(public navCtrl: NavController,
    public http: Http) {

  }

}
