import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTrainingProgramPage } from './list-training-program';

@NgModule({
  declarations: [
    ListTrainingProgramPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTrainingProgramPage),
    ComponentsModule
  ],
})
export class ListTrainingProgramPageModule {}
