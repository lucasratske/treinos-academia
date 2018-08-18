import { WorkoutService } from './../../providers/workout/workout.service';
import { ExerciseService } from './../../providers/exercise/exercise.service';
import { TrainingProgramService } from './../../providers/training-program/training-program.service';
import { MongoService } from './../../providers/mongo/mongo.service';
import { Exercise } from './../../models/exercise';
import { Workout } from './../../models/workout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { TrainingProgram } from '../../models/training-program';

@IonicPage()
@Component({
  selector: 'page-add-training-program',
  templateUrl: 'add-training-program.html',
})
export class AddTrainingProgramPage {

  trainingProgram: TrainingProgram = new TrainingProgram();
  workouts: Workout[] = [];
  exercises: Exercise[] = [];
  userId: string;
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private mongoService: MongoService,
    private trainingProgramService: TrainingProgramService,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) {
    this.userId = this.navParams.get("userId");
    this.loadingAll();
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

  openAlertAddExercicio(workout: Workout) {
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
    else if (type == 'delete')
      msg = "Deletado com sucesso!";

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

}
