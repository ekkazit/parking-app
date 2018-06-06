import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { IParking } from '../../models/parking';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Badge } from '@ionic-native/badge';

declare var google;

@IonicPage()
@Component({
  selector: 'page-gps',
  templateUrl: 'gps.html',
})
export class GpsPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  polyLine: any;

  lat: number;
  lng: number;

  parking: IParking;
  isTracking: boolean;
  trackCount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private locationProvider: LocationProvider,
    private backgroundMode: BackgroundMode,
    private badge: Badge,
  ) {
    this.parking = this.navParams.get('parking');
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.locationProvider.startTracking();
      this.loadGoogleMap();
      this.badge.set(0);
    });

    this.backgroundMode.on('activate').subscribe(() => {
      this.updateGPS();
      console.log('backgroundMode activate');
    });

    this.backgroundMode.on('deactivate').subscribe(() => {
      this.updateGPS();
      console.log('backgroundMode deactivate');
    });
  }

  loadGoogleMap() {
    var latlng = new google.maps.LatLng(this.parking.lat, this.parking.lng);
    var bounds = new google.maps.LatLngBounds();

    let mapOptions = {
      disableDefaultUI: true,
      zoom: 16,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    // destination
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    this.addMapMarker(latlng, this.parking.name);
    bounds.extend(latlng);

    // your location
    var latlng = new google.maps.LatLng(this.locationProvider.lat, this.locationProvider.lng);
    this.addMapMarker(latlng, 'คุณอยู่ที่นี่');
    bounds.extend(latlng);

    this.map.fitBounds(bounds);

    const polyOptions = {
      geodesic: true,
      strokeColor: '#0026b3',
      strokeWeight: 4,
      strokeOpacity: 0.6,
    }

    this.polyLine = new google.maps.Polyline(polyOptions);
    this.polyLine.setMap(this.map);

    google.maps.event.addListener(this.map, 'click', (event) => {
      this.addPointWithPosition(event.latLng);
    });

    console.log('loadGoogleMap GpsPage');
  }

  addMapMarker(position, name) {
    let marker = new google.maps.Marker({
      map: this.map,
      position: position,
    });

    let infoWindow = new google.maps.InfoWindow({
      content: `<h5>${name}</h5>`,
      maxWidth: 200
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    console.log('addMapMarker GpsPage');
  }

  startGPS() {
    this.trackCount += 1;
    this.badge.increase(this.trackCount);
    this.backgroundMode.enable();
    this.isTracking = true;
    this.updateGPS();
    setInterval(() => {
      this.updateGPS();
    }, 30000);

    alert('GPS Started');
  }

  stopGPS() {
    this.backgroundMode.disable();
    this.isTracking = false;
    this.badge.clear();
    alert('GPS Stopped');
  }

  updateGPS() {
    if (this.isTracking) {
      var latlng = new google.maps.LatLng(this.locationProvider.lat, this.locationProvider.lng);
      this.addPointWithPosition(latlng);
    }
  }

  addPointWithPosition(position) {
    var path = this.polyLine.getPath();
    path.push(position);

    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        path: 'M -2,0 0,-2 2,0 0,2 z',
        fillColor: '#000',
        fillOpacity: 1,
        strokeWeight: 5,
        strokeColor: '#000',
      }
    });

    this.map.setCenter(position);
  }

}
