import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingAddPage } from './parking-add';

@NgModule({
  declarations: [
    ParkingAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingAddPage),
  ],
})
export class ParkingAddPageModule {}
