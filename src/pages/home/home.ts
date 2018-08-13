import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { MongoProvider } from '../../providers/mongo/mongo';
import { Workout } from './../../models/workout';
import { Storage } from '@ionic/storage';
import { User } from './../../models/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  workouts: Workout[] = [];
  user: User = new User();

  constructor(
    public navCtrl: NavController,
    public mongoProvider: MongoProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({content: "Loading..."});
    loading.present();

    this.storage.get("user")
      .then((v) => {
        this.user = v;

        this.mongoProvider.get("workouts")
          .subscribe((d: Workout[]) => {
            this.workouts = d;
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

  deleteWorkout(id: string) {
    this.mongoProvider.delete("workouts", id)
      .subscribe(d => console.log(d));
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
