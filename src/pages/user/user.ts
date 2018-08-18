import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user = <User>this.navParams.get("user");
  }

}
