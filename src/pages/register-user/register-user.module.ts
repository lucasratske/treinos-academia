import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserPage } from './register-user';
import { MongoProvider } from '../../providers/mongo/mongo';

@NgModule({
  declarations: [
    RegisterUserPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterUserPage),
    ComponentsModule
  ],
  providers: [
    MongoProvider
  ]
})
export class RegisterUserPageModule {}
