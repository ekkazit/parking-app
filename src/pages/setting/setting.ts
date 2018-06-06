import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  accept: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private push: Push,
    private userProvider: UserProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    private app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  changeToggle() {
    const options: PushOptions = {};
    let toast = this.toastCtrl.create({
      message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
      duration: 3000,
      position: 'bottom',
    });

    let isAccept = this.accept ? 'Y' : 'N';

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('registration').subscribe((registration: any) => {
      this.userProvider.registerDevice(1, registration.registrationId, isAccept).then(data => {
        toast.present();
      }, error => {
        console.log('Error could not register device token!', error);
      });
    });
  }

  logout() {
    new Promise((resolve, reject) => {
      this.storage.remove('userId');
      this.storage.remove('token');
      this.storage.remove('username');
      resolve('logged out');
    }).then(data => {
      console.log('data=' + data);
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    });
    console.log('logout SettingPage');
  }

}
