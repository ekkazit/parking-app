import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { IParking } from '../../models/parking';
import { ParkingAddPage } from '../parking-add/parking-add';
import { ParkingDetailPage } from '../parking-detail/parking-detail';
import { ParkingProvider } from '../../providers/parking/parking';
import { LocationProvider } from '../../providers/location/location';

@IonicPage()
@Component({
  selector: 'page-parking-list',
  templateUrl: 'parking-list.html',
})
export class ParkingListPage {

  parkings: Array<IParking> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parkingProvider: ParkingProvider,
    private loadingCtrl: LoadingController,
    private locationProvider: LocationProvider,
    private platform: Platform,
  ) {
  }

  getParkingList() {
    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading...',
    });

    loader.present();

    let lat = this.locationProvider.lat;
    let lng = this.locationProvider.lng;
    this.parkingProvider.getParkingListWithDistance(lat, lng).then((data: any) => {
      this.parkings = data.rows;
      loader.dismiss();
    }, error => {
      loader.dismiss();
      console.error('Error get data!', error);
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.locationProvider.startTracking();
    });
  }

  ionViewWillEnter() {
    this.getParkingList();
  }

  doRefresh(refresher) {
    let lat = this.locationProvider.lat;
    let lng = this.locationProvider.lng;
    this.parkingProvider.getParkingListWithDistance(lat, lng).then((data: any) => {
      this.parkings = data.rows;
      refresher.complete();
    }, (error) => {
      refresher.complete();
      console.error('Error get data!', error);
    });
  }

  doSearch(event) {
    let query = event.target.value || '';

    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading...'
    });

    loader.present();

    let lat = this.locationProvider.lat;
    let lng = this.locationProvider.lng;
    this.parkingProvider.searchParkingListWithDistance(lat, lng, query).then((data: any) => {
      this.parkings = data.rows;
      loader.dismiss();
    }, (error) => {
      loader.dismiss();
      console.error('Error get data!', error);
    });
  }

  addParking() {
    this.navCtrl.push(ParkingAddPage);
  }

  viewParkingDetail(parking: IParking) {
    this.navCtrl.push(ParkingDetailPage, { 'parking': parking });
  }
}
