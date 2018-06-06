import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

// pages
import { HomePage } from '../home/home';
// providers
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;
  isLoggedIn: boolean = false;
  users: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private userProvider: UserProvider,
    private fb: Facebook
  ) {
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  loginWithFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logoutWithFacebook() {
    this.fb.logout()
      .then(res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  continueToApp() {
    let loader = this.loadingCtrl.create({ spinner: 'dots', content: 'Logging...' });
    loader.present();
    this.userProvider.loginByUsername(this.users.name).then((data: any) => {
      loader.dismiss();
      if (data.ok) {
        this.storage.set('userId', data.userId);
        this.storage.set('token', data.token);
        this.storage.set('username', this.username);
        this.navCtrl.setRoot(HomePage);
      }
    }, (error) => {
      loader.dismiss();
      console.log('Error from server!', error);
    });
  }

  ionViewDidLoad() {
    // this.storage.get('token').then(value => {
    //   if (value) {
    //     this.navCtrl.setRoot(HomePage);
    //   }
    // });
  }

  doLogin() {
    let loader = this.loadingCtrl.create({ spinner: 'dots', content: 'Logging...' });
    loader.present();
    this.userProvider.login(this.username, this.password).then((data: any) => {
      loader.dismiss();
      if (data.ok) {
        this.storage.set('userId', data.userId);
        this.storage.set('token', data.token);
        this.storage.set('username', this.username);
        this.navCtrl.setRoot(HomePage);
      }
    }, (error) => {
      loader.dismiss();
      console.log('Error from server!', error);
    });
  }

}
