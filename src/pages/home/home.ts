import { ExerciseService } from './../../providers/exercise/exercise.service';
import { WorkoutService } from './../../providers/workout/workout.service';
import { Exercise } from './../../models/exercise';
import { TrainingProgramService } from './../../providers/training-program/training-program.service';
import { MongoService } from './../../providers/mongo/mongo.service';
import { TrainingProgram } from './../../models/training-program';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, AlertController, ToastController } from 'ionic-angular';
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
  userId: string;
  hasRegister: boolean = true;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public trainingProgramService: TrainingProgramService,
    public mongoService: MongoService,
    private storage: Storage,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {

  }

  ionViewWillEnter() {
    this.workouts = [];
    this.exercises = [];

    this.storage.get("user")
      .then((v: User) => {
        this.userId = v._id.$oid;
        this.loadingAll();
      })
      .catch((e) => console.log("Error getting the user from storage", e));

  }


  loadingAll() {
    this.loading = this.loadingCtrl.create({content: "Loading..."});
    this.loading.present();
    this.workouts = [];
    this.exercises = [];
    this.getAll().then(() =>
      this.loading.dismiss()
    )
    .catch(() => {
      this.exercises = [];
      this.workouts = [];
      this.loading.dismiss()
    });
  }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.trainingProgramService.getOneByUser(this.userId)
      .subscribe((r: TrainingProgram) => {
        this.trainingProgram = r;
        this.workoutService.getByProgram(r._id.$oid)
          .subscribe((workouts: Workout[]) => {
            if (workouts.length) {
              this.workouts = workouts;
              workouts.forEach(workout => {
                this.exerciseService.getByWorkout(workout._id.$oid)
                  .subscribe((exercises: Exercise[]) => {
                    if (exercises.length) {
                      exercises.forEach(e => {
                        this.exercises.push(e);
                      })
                    }
                    if (this.exercises.length || this.workouts.length)
                      resolve();
                    else
                      reject();
                  },
                  () => reject()
                );
              });
            }
            else reject();
          },
          () => reject()
        );
      },
      () => reject()
      );
    })
  }

  openAlertEditWorkout(workout: Workout) {
    let alert = this.alertCtrl.create({
      title: `Editar ${workout.name}`,
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome',
          value: workout.name
        },
        {
          name: 'order',
          placeholder: 'Ordem',
          value: workout.order.toString(),
          type: "number"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          role: 'save',
          handler: data => {
            if (data.name && data.order) {
              workout.name = data.name;
              workout.order = data.order;
              this.mongoService.put("workouts", workout).subscribe(() => {
                this.loadingAll();
                this.showToast("edit-workout");
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  openAlertAddWorkout(workout: Workout) {
    let alert = this.alertCtrl.create({
      title: 'Adicionar exercício',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome'
        },
        {
          name: 'repetitions',
          placeholder: 'Repetições (ex: 3x12)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          role: 'save',
          handler: data => {
            if (data.name && data.repetitions) {
              const exercise: Exercise = {
                name: data.name,
                repetitions: data.repetitions,
                _id: null,
                workoutId: workout._id.$oid
              }

              this.mongoService.post("exercises", exercise)
                .subscribe((d: Exercise) => {
                  this.exercises.push(d);
                  this.showToast('exercise');
                });
            }
          }
        }
      ]
    });
    alert.present();
  }

  addWorkout() {
    const lastWorkout: Workout = this.workouts[this.workouts.length - 1];
    const order: number = (lastWorkout) ? lastWorkout.order + 1 : 1;

    this.saveTrainingProgram()
      .then((trainingProgram: TrainingProgram) => {
        const workout: Workout = {
         name: "Treino " + order.toString(),
         order: order,
         _id: null,
         trainingProgramId: trainingProgram._id.$oid
        };

        this.mongoService.post("workouts", workout)
          .subscribe((d: Workout) => {
            this.workouts.push(d);
            this.showToast('workout');
          });
      });
  }

  saveTrainingProgram(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.trainingProgram._id)
        resolve(this.trainingProgram);
      else {
        this.trainingProgram.userId = this.userId;
        this.mongoService.post("programs", this.trainingProgram)
          .subscribe(
            (trainingProgram) => {
              this.trainingProgram = <TrainingProgram>trainingProgram
              resolve(this.trainingProgram);
            },
            (err) => reject(err)
          );
      }
    });
  }

  delete(type: string, object: any) {
    this.mongoService.delete(type, object._id.$oid)
      .subscribe(() => {
        this.loadingAll();
        this.showToast("delete");
      });
  }

  showToast(type: string) {
    let msg = "";
    if (type == 'workout')
      msg = "Treino adicionado com sucesso!";
    else if (type == 'exercise')
      msg = "Exercício adicionado com sucesso!";
    else if (type == 'edit-workout')
      msg = "Treino editado com sucesso!";
    else if (type == 'delete')
      msg = "Deletado com sucesso!";

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });

    toast.present();
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
