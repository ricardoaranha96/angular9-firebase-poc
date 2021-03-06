import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mix-firebase-sample';  
  name = new FormControl();
  username = new FormControl();
  password = new FormControl();

  constructor(public auth:AngularFireAuth){
    
  }

  login(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("X-Company-Code", "RMIX");
    let requestBody = {
      username: this.username.value,
      password: this.password.value
    };    
    let requestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody) 
    };
    fetch("http://127.0.0.1:4000/api/users/loginApi", requestInit)
      .then(function(response){        
        console.log(response);
      });
  }

  firebaseLoginGoogle(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(firebaseUser => {
        this.loginWithFirebaseUser();         
      });
  }

  async loginWithFirebaseUser(){
    let authUser = await this.auth.currentUser;    
    let idToken = await authUser.getIdToken();
    let requestBody = {
      id_token: idToken      
    };    
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("X-Company-Code", "RMIX");
    let requestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody)
    };
    fetch("http://127.0.0.1:4000/api/users/loginFirebase", requestInit)
      .then(function(response){
        console.log(response);
      });
  }

  register(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("X-Company-Code", "RMIX");
    let requestBody = {
      name: this.name.value,
      email: this.username.value,
      password: this.password.value
    };    
    let requestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody)
    };
    fetch("http://127.0.0.1:4000/api/users/add", requestInit)
      .then(function(response){
        console.log(response);
      });
  }
  
}
