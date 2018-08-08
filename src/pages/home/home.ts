import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, ToastController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public mongoProvider: MongoProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({content: "Loading..."});
    loading.present();

    //let user: User = new User();
    // this.storage.get("user")
    //   .then((v) => {
    //     user = v;
    //     let toast = this.toastCtrl.create({
    //       message: 'Bem vindo ' + user.name,
    //       duration: 3000,
    //       position: 'top'
    //     });
    //     toast.present();
    //   })
    //   .catch((e) => console.log("Error getting the user from storage", e));

    this.mongoProvider.get("workouts")
      .subscribe((d: Workout[]) => {
        this.workouts = d;
        loading.dismiss();
      });

  }

  goRegisterWorkout()
  {
    this.navCtrl.push("RegisterWorkoutPage");
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
