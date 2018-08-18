import { MongoService } from './../../providers/mongo/mongo.service';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';

@NgModule({
  declarations: [
    UserPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    ComponentsModule
  ],
  providers: [
    MongoService
  ]
})
export class UserPageModule {}
