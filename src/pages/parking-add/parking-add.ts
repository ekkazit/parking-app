import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IParking } from '../../models/parking';
import { ParkingProvider } from '../../providers/parking/parking';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-parking-add',
  templateUrl: 'parking-add.html',
})
export class ParkingAddPage {

  parking: IParking;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parkingProvider: ParkingProvider,
    private toastCtrl: ToastController,
    private camera: Camera,
  ) {
    this.parking = { id: 0, name: '', available: 1 };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingAddPage');
  }

  save() {
    let toast = this.toastCtrl.create({
      message: 'เพิ่มข้อมูลที่จอดเรียบร้อยแล้ว',
      duration: 3000,
      position: 'bottom',
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    this.parkingProvider.addParking(this.parking).then((data: any) => {
      if (data.ok) {
        toast.present();
      }
    }, (error) => {
      console.log('Error save data!', error);
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.parking.photo = base64Image;
    }, (error) => {
      console.error('Camera error!', error);
    });
  }

  browsePicture() {
    let options: CameraOptions = {
      destinationType: 0,
      sourceType: 0,
      allowEdit: true
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.parking.photo = base64Image;
    }, (error) => {
      console.error('Browse picture error!', error);
    });
  }

  removePicture() {
    this.parking.photo = null;
    console.log('removePicture ParkingAddPage');
  }

}
