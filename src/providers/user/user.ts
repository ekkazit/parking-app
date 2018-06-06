import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class UserProvider {

  constructor(
    public http: HttpClient,
    @Inject('API_URL') private url: string
  ) {
    console.log('Hello UserProvider Provider');
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      let data = {
        username: username,
        password: password,
      };
      this.http.post(this.url + '/users/login', data).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }
  loginByUsername(username) {
    return new Promise((resolve, reject) => {
      let data = {
        username: username,
      };
      this.http.post(this.url + '/users/loginbyuser', data).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }
  registerDevice(userId, deviceToken, isAccept) {
    return new Promise((resolve, reject) => {
      let data = {
        user_id: userId,
        device_token: deviceToken,
        is_accept: isAccept,
      };
      this.http.post(this.url + '/fcm/registerdevice', data).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }

}
