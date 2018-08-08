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

  user: User
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.user = new User();
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.user.name = "Lucas Ratske";
    this.user.email = "lucas.ratske@gmail.com";
    this.user.password = "123";

    this.storage.set('user', this.user)
      .then(() => {
        let toast = this.toastCtrl.create({
          message: 'Bem vindo ' + this.user.name,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot("HomePage");
      })
      .catch((e) => console.log("Error at setting the user in the storage", e));
  }

  goNovoUsuario() {
    this.navCtrl.push("RegisterUserPage");
  }

}
