import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;
  incorrect: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {
    this.user = new User();
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.userService.getAccess(this.user)
    .subscribe((u: User) => {
      if (u) {
        this.user = u;
        this.incorrect = false;
        this.storage.set('user', u)
        .then(() => {
          let toast = this.toastCtrl.create({
            message: 'Bem vindo ' + u.name,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.setRoot("HomePage");
        })
        .catch((e) => console.log("Error at setting the user in the storage", e));
      }
      else this.incorrect = true;
    },
    (err) => console.log("error", err));
  }

  goNovoUsuario() {
    this.navCtrl.push("RegisterUserPage");
  }

}
