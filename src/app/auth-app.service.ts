import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthAppService {
  email = '';
  pass = '';
  authUser = null;
  constructor(public authApp: AngularFireAuth) { }

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
    console.log('google login!');
    this.authApp.auth.signInWithPopup( new auth.TwitterAuthProvider() )
      .then( user => {
        console.log('user logueado: ', user);
        this.email = '';
        this.pass = '';
        this.authUser = user.user;
      })
      .catch( error => {
        console.log('error en twitter login: ', error);
      });
  }
  glogin() {
    console.log('google login!');
    this.authApp.auth.signInWithPopup( new auth.GoogleAuthProvider() )
      .then( user => {
        console.log('user logueado: ', user);
        this.email = '';
        this.pass = '';
        this.authUser = user.user;
      })
      .catch( error => {
        console.log('error en google login: ', error);
      });
  }
  logout() {
    console.log('logout!');
    this.authApp.auth.signOut();
  }
}
