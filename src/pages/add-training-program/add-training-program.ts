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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.trainingProgram = new TrainingProgram();
  }

  onSubmit() {

  }
}
