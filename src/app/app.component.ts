import { User } from './../models/user';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.openPage();
    });
  }

  openPage() {
    this.storage.get('user').then((val) => {
      this.rootPage = (val == null) ? "LoginPage" : "HomePage";
      this.nav.setRoot(this.rootPage);
    });
  }

  goToPrograms() {
    this.storage.get('user').then((val: User) => {
      this.goToPage("ListTrainingProgramPage", {
        "userId": val._id.$oid
      });
    });
  }

  goToPage(page: string, params = {}) {
    if (page == this.rootPage) this.nav.setRoot(page);
    else this.nav.push(page, params);
  }

  logout() {
    this.storage.remove("user")
      .then(() => this.initializeApp())
      .catch((e)=> console.log(`Error at removing the user from storage`, e))
  }
}
