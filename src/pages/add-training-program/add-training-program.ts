import { Exercise } from './../../models/exercise';
import { Workout } from './../../models/workout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrainingProgram } from '../../models/training-program';

@IonicPage()
@Component({
  selector: 'page-add-training-program',
  templateUrl: 'add-training-program.html',
})
export class AddTrainingProgramPage {

  trainingProgram: TrainingProgram;
  workouts: Workout[] = [
    {
      _id: null,
      trainingProgramId: null,
      userId: null,
      name: "A",
      order: 1,
    },
    {
      _id: null,
      trainingProgramId: null,
      userId: null,
      name: "B",
      order: 2,
    },
    {
      _id: null,
      trainingProgramId: null,
      userId: null,
      name: "C",
      order: 3,
    }
  ];

  exercises: Exercise[] = [
    {
      _id: null,
      cycle: 2,
      name: "Exercicio X",
      repetitions: 5,
      workoutId: null
    },
    {
      _id: null,
      cycle: 2,
      name: "Exercicio Y",
      repetitions: 5,
      workoutId: null
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.trainingProgram = new TrainingProgram();
  }

  salvarPrograma() {

  }
}
