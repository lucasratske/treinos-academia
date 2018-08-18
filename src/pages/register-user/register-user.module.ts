import { MongoService } from './../../providers/mongo/mongo.service';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserPage } from './register-user';

@NgModule({
  declarations: [
    RegisterUserPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterUserPage),
    ComponentsModule
  ],
  providers: [
    MongoService
  ]
})
export class RegisterUserPageModule {}
