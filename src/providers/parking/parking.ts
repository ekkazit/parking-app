import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { IParking } from '../../models/parking';

@Injectable()
export class ParkingProvider {

  constructor(
    public http: HttpClient,
    @Inject('API_URL') private url: string
  ) {
    console.log('Hello ParkingProvider Provider');
  }

  getParkingList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/parking').subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  searchParkingList(query) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/parking/search/' + query).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  addParking(parking: IParking) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/parking/add', parking).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getParkingById(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/parking/get/' + id).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2
      + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return dis;
  }


  getParkingListWithDistance(lat, lng) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/parking').subscribe((data: any) => {
        data.rows.forEach(p => {
          if (lat && lng) {
            p.distance = this.calculateDistance(lat, p.lat, lng, p.lng).toFixed(1);
          } else {
            p.distance = 0;
          }
        });
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  searchParkingListWithDistance(lat, lng, query) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/parking/search/' + query).subscribe((data: any) => {
        data.rows.forEach(p => {
          if (lat && lng) {
            p.distance = this.calculateDistance(lat, p.lat, lng, p.lng).toFixed(1);
          } else {
            p.distance = 0;
          }
        });
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
}
