import { ExerciseService } from './../../providers/exercise/exercise.service';
import { WorkoutService } from './../../providers/workout/workout.service';
import { TrainingProgramService } from './../../providers/training-program/training-program.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTrainingProgramPage } from './add-training-program';
import { ComponentsModule } from './../../components/components.module';
import { MongoService } from '../../providers/mongo/mongo.service';

@NgModule({
  declarations: [
    AddTrainingProgramPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTrainingProgramPage),
    ComponentsModule
  ],
  providers: [
    MongoService,
    TrainingProgramService,
    WorkoutService,
    ExerciseService
  ]
})
export class AddTrainingProgramPageModule {}
