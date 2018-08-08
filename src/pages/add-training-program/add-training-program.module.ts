import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTrainingProgramPage } from './add-training-program';
import { ComponentsModule } from './../../components/components.module';
import { MongoProvider } from './../../providers/mongo/mongo';

@NgModule({
  declarations: [
    AddTrainingProgramPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTrainingProgramPage),
    ComponentsModule
  ],
  providers: [
    MongoProvider
  ]
})
export class AddTrainingProgramPageModule {}
