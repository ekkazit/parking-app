import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingListPage } from './parking-list';

@NgModule({
  declarations: [
    ParkingListPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingListPage),
  ],
})
export class ParkingListPageModule {}
