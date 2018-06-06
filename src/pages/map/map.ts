import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';

// interfaces
import { IParking } from '../../models/parking';
import { ParkingProvider } from '../../providers/parking/parking';
import { LocationProvider } from '../../providers/location/location';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  parking: IParking;
  markers = new Map<string, any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private parkingProvider: ParkingProvider,
    private locationProvider: LocationProvider
  ) {
    this.parking = this.navParams.get('parking');
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadGoogleMap();
    });
    console.log('ionViewDidLoad MapPage');
  }

  ionViewWillEnter() {
    this.clearMarkers();

    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading...'
    });

    loader.present();

    var bounds = new google.maps.LatLngBounds();

    this.parkingProvider.getParkingList().then((data: any) => {
      let parkings = data.rows;

      parkings.forEach(p => {
        let position = new google.maps.LatLng(p.lat, p.lng);
        this.addMarker(position, p.name, p.description);
        bounds.extend(position);
      });

      this.map.fitBounds(bounds);

      loader.dismiss();
    }, (error) => {
      loader.dismiss();
      console.log('Could not load parking list!', error);
    });

    console.log('ionViewWillEnter MapPage');
  }


  clearMarkers() {
    this.markers.forEach((marker: any, key: string) => {
      marker.setMap(null);
    });
    this.markers.clear();
  }

  loadGoogleMap() {
    var latlng = new google.maps.LatLng(this.locationProvider.lat, this.locationProvider.lng);

    let mapOptions = {
      disableDefaultUI: true,
      zoom: 16,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    // add your location
    this.addYourMarker(latlng, 'คุณอยู่ที่นี่');
  }

  addMarker(position, name, description) {
    let marker = new google.maps.Marker({
      map: this.map,
      position: position,
    });

    let infoWindow = new google.maps.InfoWindow({
      content: `<h5>${name}</h5><p>${description}</p>`,
      maxWidth: 200,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    this.markers.set(name, marker);
  }

  addYourMarker(position, name) {
    let marker = new google.maps.Marker({
      map: this.map,
      position: position,
      icon: './assets/img/blue-dot.png',
    });

    let infoWindow = new google.maps.InfoWindow({
      content: `${name}`,
      maxWidth: 200,
    });

    infoWindow.open(this.map, marker);
  }

}
