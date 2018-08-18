import { ExerciseService } from './../../providers/exercise/exercise.service';
import { WorkoutService } from './../../providers/workout/workout.service';
import { TrainingProgramService } from './../../providers/training-program/training-program.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './../../components/components.module';
import { HomePage } from './home';
import { MongoService } from '../../providers/mongo/mongo.service';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule
  ],
  providers: [
    MongoService,
    TrainingProgramService,
    WorkoutService,
    ExerciseService
  ]
})
export class HomePageModule {}
