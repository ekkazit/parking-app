import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ParkingListPage } from '../pages/parking-list/parking-list';
import { ParkingDetailPage } from '../pages/parking-detail/parking-detail';
import { ParkingAddPage } from '../pages/parking-add/parking-add';
import { MapPage } from '../pages/map/map';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { SettingPage } from '../pages/setting/setting';
import { GpsPage } from '../pages/gps/gps';
import { ParkingProvider } from '../providers/parking/parking';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from '../providers/location/location';
import { IonicStorageModule } from '@ionic/storage';
import { UserProvider } from '../providers/user/user';
import { TokenInterceptor } from '../interceptors/token';
import { Push } from '@ionic-native/push';
import { Facebook } from '@ionic-native/facebook';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Badge } from '@ionic-native/badge';
import { ThaiNumberPipe } from '../pipes/thai-number/thai-number';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ParkingListPage,
    ParkingDetailPage,
    ParkingAddPage,
    MapPage,
    GpsPage,
    QrcodePage,
    SettingPage,
    ThaiNumberPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    MomentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ParkingListPage,
    ParkingDetailPage,
    ParkingAddPage,
    MapPage,
    GpsPage,
    QrcodePage,
    SettingPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: 'API_URL', useValue: 'http://127.0.0.1:3000' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ParkingProvider,
    CallNumber,
    Camera,
    BarcodeScanner,
    Geolocation,
    LocationProvider,
    UserProvider,
    Push,
    Facebook,
    BackgroundMode,
    Badge,
  ]
})
export class AppModule { }
