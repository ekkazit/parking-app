import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IParking } from '../../models/parking';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ParkingProvider } from '../../providers/parking/parking';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  parking: IParking;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parkingProvider: ParkingProvider,
    private barcodeScanner: BarcodeScanner
  ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.parkingProvider.getParkingById(barcodeData.text).then((data: any) => {
        this.parking = data.rows;
      }, (error) => {
        console.error('Could not get data!', error);
      });
    }).catch(error => {
      console.error('Error in barcode scan!', error);
    });
  }

}
