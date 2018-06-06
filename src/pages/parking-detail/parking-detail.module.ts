import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingDetailPage } from './parking-detail';

@NgModule({
  declarations: [
    ParkingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingDetailPage),
  ],
})
export class ParkingDetailPageModule {}
