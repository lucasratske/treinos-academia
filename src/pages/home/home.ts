import { ExerciseService } from './../../providers/exercise/exercise.service';
import { WorkoutService } from './../../providers/workout/workout.service';
import { Exercise } from './../../models/exercise';
import { TrainingProgramService } from './../../providers/training-program/training-program.service';
import { MongoService } from './../../providers/mongo/mongo.service';
import { TrainingProgram } from './../../models/training-program';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
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
  exercises: Exercise[] = [];
  user: User = new User();
  hasRegister: boolean = true;

  constructor(
    public navCtrl: NavController,
    public trainingProgramService: TrainingProgramService,
    public mongoService: MongoService,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) {

  }

  ionViewWillEnter() {
    this.workouts = [];
    this.exercises = [];
    let loading = this.loadingCtrl.create({content: "Loading..."});
    loading.present();

    this.storage.get("user")
      .then((v: User) => {
        this.user = v;

        this.trainingProgramService.getOneByUser(v._id.$oid)
          .subscribe((trainingProgram: TrainingProgram) => {
            this.trainingProgram = trainingProgram;

            this.workoutService.getByProgram(trainingProgram._id.$oid)
              .subscribe((workouts: Workout[]) => {
                this.workouts = workouts;
                if (workouts.length)
                  this.hasRegister = true;
                else
                  this.hasRegister = false;
                workouts.forEach(workout => {
                  this.exerciseService.getByWorkout(workout._id.$oid)
                  .subscribe((exercises: Exercise[]) => {
                    exercises.forEach(e => {
                      this.exercises.push(e);
                    })
                  })
                });
              });
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

  goToUser() {
    this.storage.get("user")
    .then((u: User) => {
      this.navCtrl.push(
        'UserPage',
        {
          user: u
        }
      );
    })
    .catch(err => console.log(err));
  }

  logout() {
    this.storage.remove("user")
      .then(() => this.navCtrl.setRoot("LoginPage"))
      .catch((e)=> console.log(`Error at removing the user from storage`, e))
  }

}
