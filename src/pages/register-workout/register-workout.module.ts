import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './../../components/components.module';
import { RegisterWorkoutPage } from './register-workout';
import { MongoProvider } from '../../providers/mongo/mongo';

@NgModule({
  declarations: [
    RegisterWorkoutPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterWorkoutPage), ComponentsModule,
  ],
  providers: [
    MongoProvider
  ]
})
export class RegisterWorkoutPageModule {}
