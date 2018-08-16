import { MongoProvider } from './../../providers/mongo/mongo';
import { TrainingProgram } from './../../models/training-program';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { TrainingProgramProvider } from '../../providers/training-program/training-program';
import { Workout } from './../../models/workout';
import { Storage } from '@ionic/storage';
import { User } from './../../models/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trainingProgram: TrainingProgram = new TrainingProgram();
  workouts: Workout[] = [];
  user: User = new User();

  constructor(
    public navCtrl: NavController,
    public trainingProgramProvider: TrainingProgramProvider,
    public mongoProvider: MongoProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({content: "Loading..."});
    loading.present();

    this.storage.get("user")
      .then((v: User) => {
        this.user = v;

        this.trainingProgramProvider.getOneByUser(v._id.$oid)
          .subscribe((trainingProgram: TrainingProgram) => {
            this.trainingProgram = trainingProgram;
            const q = `q{ trainingProgramId = '${trainingProgram._id.$oid}' }`;
            this.mongoProvider.getByQuery("workouts", q)
              .subscribe((workouts: Workout[]) => this.workouts = workouts);
            loading.dismiss();
          });
      })
      .catch((e) => console.log("Error getting the user from storage", e));

  }

  goToAddTrainingProgram()
  {
    this.navCtrl.push(
      'AddTrainingProgramPage',
      {
        userId: this.user._id.$oid
      }
    );
  }

  editWorkout(id: string) {
    this.navCtrl.push(
      "RegisterWorkoutPage",
      {
        workoutId: id
      }
    );
  }

}
