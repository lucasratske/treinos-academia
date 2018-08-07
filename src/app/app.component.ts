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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.openPage();
    });
  }

  openPage() {
    this.storage.get('user').then((val) => {
      this.rootPage = "HomePage";
      if (val == null)
        this.rootPage = "LoginPage";
      this.nav.setRoot(this.rootPage);
    });
  }

  goToPage(page: string) {
    if (page == this.rootPage)
      this.nav.setRoot(page);
    else
      this.nav.push(page);
  }

  logout() {
    this.storage.remove("user")
      .then(() => this.initializeApp())
      .catch((e)=> console.log(`Error at removing the user from storage`, e))
  }
}
