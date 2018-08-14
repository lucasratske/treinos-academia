import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './../../components/components.module';
import { HomePage } from './home';
import { TrainingProgramProvider } from './../../providers/training-program/training-program';
import { MongoProvider } from './../../providers/mongo/mongo';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule
  ],
  providers: [
    MongoProvider,
    TrainingProgramProvider
  ]
})
export class HomePageModule {}
