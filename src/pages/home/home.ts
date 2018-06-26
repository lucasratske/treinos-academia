import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { MongoProvider } from '../../providers/mongo/mongo';
import { Workout } from './../../models/workout';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  workouts: Workout[];

  constructor(
    public navCtrl: NavController,
    public mongoProvider: MongoProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({content: "Loading..."});
    loading.present();

    this.workouts = [];
    this.mongoProvider.get("workouts")
      .subscribe(d => {
        this.workouts = d;
        loading.dismiss();
      });

  }

  goCadastrarTreino()
  {
    this.navCtrl.push("CadastrarTreinoPage");
  }

  deleteWorkout(id: string) {
    this.mongoProvider.delete("workouts", id)
      .subscribe(d => console.log(d));
  }

  editWorkout(id: string) {
    this.navCtrl.push(
      "CadastrarTreinoPage",
      {
        workoutId: id
      }
    );
  }

}
