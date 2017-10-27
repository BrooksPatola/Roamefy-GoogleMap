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
    //let creates a variable declaration for each loop which is block level declaration. 
    let name  = marker.calEvent["eventName"];
    let webSite = marker.calEvent["eventWebsite"];
    let description = marker.calEvent["description"];
    let orgPhone  = marker.calEvent["orgPhone"];
    let categories = marker.calEvent["categoryString"];
 
    //variable to pass into setContent of infoWindow
    let contentString = '<h1>' + name +'</h1>'+ '<p><b>description: </b> '  +  description + '</p>'   +
                                               //'<p><b>description: </b> '  +   webSite + '</p>'   +   
                                               '<p><b>website: </b>' + '<a href="  '+ webSite +'     ">'  +  'link'     +       '</a>'    +              
                                                '<p><b>phone: </b> '        +  orgPhone    + '</p>'   +                                          
                                                '<p><b>category(s): </b> '  +  categories  + '</p>'

    

      console.log(name); //displays name of each event within this object
   
      
      marker = new google.maps.Marker({
       position: loc,
      map: this.map,
      
      });


      var infoWindow = new google.maps.InfoWindow({
        
          
        }); 

      
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(this.map, marker);
            infoWindow.setContent(contentString);
            
          });
       
    

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
