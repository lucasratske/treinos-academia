import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { MongoService } from '../../providers/mongo/mongo.service';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private mongoService: MongoService
  ) {
    this.user = <User>this.navParams.get("user");
  }

  openAlertEdit() {
    let user: User = this.user;
    let alert = this.alertCtrl.create({
      title: `Editar usuário`,
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome',
          value: user.name
        },
        {
          name: 'password',
          placeholder: 'Senha',
          value: user.password,
          type: "password"
        },
        {
          name: 'age',
          placeholder: 'Idade',
          value: (user.age != undefined) ? user.age.toString() : "",
          type: "number"
        },
        {
          name: 'height',
          placeholder: 'Altura',
          value: (user.height != undefined) ? user.height.toString() : "",
          type: "number"
        },
        {
          name: 'weight',
          placeholder: 'Peso',
          value: (user.weight != undefined) ? user.weight.toString() : "",
          type: "number"
        },
        {
          name: 'goal',
          placeholder: 'Objetivo',
          value: user.goal,
          type: "text"
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

            user.name = data.name;
            user.password = data.password;
            user.age = data.age;
            user.height = data.height;
            user.weight = data.weight;
            user.goal = data.goal;
            this.mongoService.put("users", user)
            .subscribe(() => this.showToast());

          }
        }
      ]
    });
    alert.present();
  }


  showToast() {

    let toast = this.toastCtrl.create({
      message: "Usuário editado com sucesso!",
      duration: 2000
    });

    toast.present();
  }
}
