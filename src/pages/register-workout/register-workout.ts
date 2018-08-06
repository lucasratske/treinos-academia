import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Workout } from '../../models/workout';
import { MongoProvider } from '../../providers/mongo/mongo';

@IonicPage()
@Component({
  selector: 'page-register-workout',
  templateUrl: 'register-workout.html',
})
export class RegisterWorkoutPage {

  workout: Workout;
  workoutId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mongoProvider: MongoProvider,
    public loadingCtrl: LoadingController
  ) {
    this.workout = new Workout();
    this.workoutId = this.navParams.get('workoutId');
  }

  ionViewDidLoad() {
    if (this.workoutId != undefined) {
      const loading = this.loadingCtrl.create({content: "Loading..."});
      loading.present();

      this.mongoProvider.get("workouts", this.workoutId)
        .subscribe(d => {
          this.workout = d;
          loading.dismiss();
          console.log(d);
        });
    }
  }

  onSubmit() {
    this.mongoProvider.post("workouts", this.workout)
      .subscribe(d => this.navCtrl.setRoot("LoginPage"));
  }

}
