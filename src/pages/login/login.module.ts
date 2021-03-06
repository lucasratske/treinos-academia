import { MongoService } from './../../providers/mongo/mongo.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { UserService } from '../../providers/user/user.service';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    MongoService,
    UserService
  ]
})
export class LoginPageModule {}
