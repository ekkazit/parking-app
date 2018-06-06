import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

  lat: number;
  lng: number;

  constructor(
    private geolocation: Geolocation,
    private zone: NgZone,
  ) {
    console.log('Hello LocationProvider Provider');
  }

  startTracking() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.zone.run(() => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        console.log('Get location: lat=' + this.lat + ' ' + this.lng);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.geolocation.watchPosition().subscribe((data) => {
      this.zone.run(() => {
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
        console.log('Watch location: lat=' + this.lat + ' ' + this.lng);
      });
    });
  }

}
