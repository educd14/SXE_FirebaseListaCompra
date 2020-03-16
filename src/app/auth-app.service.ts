import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthAppService {
  authUser = null;
  twitter = false;
  google = false;
  constructor(public authApp: AngularFireAuth) {
  }

  user = this.authApp.authState.pipe( map(authState => {
    console.log('authState', authState);
    if (!authState) {
      return null;
    } else {
      // …
      return authState;
    }
  }) );
  tlogin() {
    console.log('Twitter login!');
    this.twitter = true;
    this.authApp.auth.signInWithPopup( new auth.TwitterAuthProvider() )
      .then( user => {
        console.log('user logueado: ', user);
        this.authUser = user.user;
      })
      .catch( error => {
        console.log('error en twitter login: ', error);
      });
  }
  glogin() {
    console.log('google login!');
    this.google = true;
    this.authApp.auth.signInWithPopup( new auth.GoogleAuthProvider() )
      .then( user => {
        console.log('user logueado: ', user);
        this.authUser = user.user;
      })
      .catch( error => {
        console.log('error en google login: ', error);
      });
  }
  logout() {
    console.log('logout!');
    this.google = false;
    this.twitter = false;
    this.authApp.auth.signOut();
  }
}
