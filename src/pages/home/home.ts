import { Component , ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpProvider} from '../../providers/http/http'; //importing provider 

declare var google: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpProvider]
})
export class HomePage {

  eventData: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController,
    public http: Http, private httpProvider:HttpProvider) {

      this.getdata();

  }


  ionViewDidLoad(){
    this.displayGoogleMap();
this.getMarkers();
  }



  displayGoogleMap(){
    let latLng = new google.maps.LatLng(43.653908,-79.384293);
  let mapOptions = {
    center:latLng,
    zoom:12,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
}


getMarkers(){
    this.http.get('http://app.toronto.ca/cc_sr_v1_app/data/edc_eventcal_APR?limit=500').map((res)=>res.json()).subscribe(data=>{
    this.addMarkersMap(data);
  });


}


addMarkersMap(markers){
  for(let marker of markers)
  {
    var loc = marker.calEvent.locations[0]['coords'];


      console.log(loc);
   
      
      marker = new google.maps.Marker({
       position: loc,
      map: this.map,
  
      
      });


      var infoWindow = new google.maps.InfoWindow({
       
      content: ""
    }); 

    google.maps.event.addListener(marker, 'click', function(str)
    { 
       return function() {
               infoWindow.setContent(str);
               infoWindow.open(this.map, marker);
                         }
    }(markers.eventName));
    

}
}

getdata(){
  
  
  this.httpProvider.getJsonData().subscribe(
    data => {
  console.log(data);
  this.eventData=JSON.parse(JSON.stringify(data));
  console.log(this.eventData);
  
  },
  err =>{
  console.error("Error : " +err);
  },
  () => {
  console.log('getData completed');
  }
  );
  }



  
}
