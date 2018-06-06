import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IParking } from '../../models/parking';
import { CallNumber } from '@ionic-native/call-number';
import { MapPage } from '../map/map';
import { GpsPage } from '../gps/gps';

@IonicPage()
@Component({
  selector: 'page-parking-detail',
  templateUrl: 'parking-detail.html',
})
export class ParkingDetailPage {

  parking: IParking;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
  ) {
    this.parking = this.navParams.get('parking');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingDetailPage');
  }

  callPhone() {
    this.callNumber.callNumber(this.parking.shared_phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    console.log('callPhone ParkingDetailPage');
  }

  gotoMap() {
    this.navCtrl.push(MapPage, { parking: this.parking });
  }

  gotoGPS() {
    this.navCtrl.push(GpsPage, { parking: this.parking });
  }

}
