import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkingListPage } from '../parking-list/parking-list';
import { MapPage } from '../map/map';
import { QrcodePage } from '../qrcode/qrcode';
import { SettingPage } from '../setting/setting';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parkingPage: any;
  mapPage: any;
  qrcodePage: any;
  settingPage: any;

  constructor(public navCtrl: NavController) {
    this.parkingPage = ParkingListPage;
    this.mapPage = MapPage;
    this.qrcodePage = QrcodePage;
    this.settingPage = SettingPage;
  }
}
