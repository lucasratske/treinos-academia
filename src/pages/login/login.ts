import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MongoProvider } from '../../providers/mongo/mongo';

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
    private toastCtrl: ToastController,
    private mongoProvider: MongoProvider
  ) {
    this.user = new User();
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    this.mongoProvider.get("users", "5b70d5681f6e4f22f3f8c6b2")
      .subscribe(
        (d: User) => {
          this.user = d;
          this.storage.set('user', d)
            .then(() => {
              let toast = this.toastCtrl.create({
                message: 'Bem vindo ' + d.name,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.setRoot("HomePage");
            })
            .catch((e) => console.log("Error at setting the user in the storage", e));
        },
        (err) => console.log("Error at saving", err)
      );
    }

  goNovoUsuario() {
    this.navCtrl.push("RegisterUserPage");
  }

}
