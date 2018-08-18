import { MongoService } from './../../providers/mongo/mongo.service';
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
    public mongoService: MongoService,
    public loadingCtrl: LoadingController) {

      this.user = new User();
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.mongoService.post("users", this.user)
      .subscribe((r: User) => {
        let program: TrainingProgram = new TrainingProgram;
        program.userId = r._id.$oid;
        this.mongoService.post("programs", program)
          .subscribe(() => this.navCtrl.pop());
      });
  }

}
