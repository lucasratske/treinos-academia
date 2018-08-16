import { MongoProvider } from './../../providers/mongo/mongo';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TrainingProgram } from '../../models/training-program';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mongoProvider: MongoProvider,
    public loadingCtrl: LoadingController) {

      this.user = new User();
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.mongoProvider.post("users", this.user)
      .subscribe((r: User) => {
        let program: TrainingProgram = new TrainingProgram;
        program.userId = r._id.$oid;
        this.mongoProvider.post("programs", program)
          .subscribe(() => this.navCtrl.pop());
      });
  }

}
