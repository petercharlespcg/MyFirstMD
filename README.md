# Angular 9 Masterclass with TypeScript, Firebase, and Material
https://proquestpubliclibrary-safaribooksonline-com.ezproxy.torontopubliclibrary.ca/video/web-development/9781800567764

## Using Material Design Dropdowns and Form Inputs

Introducing Angular Material into your Angular CLI Project on the top of MDB
Angular Material UI component library
ng add @angular/material
ng g m app-material
src\app\app-material\app-material.module.ts
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    MatCheckboxModule
  ],
  exports: [
    MatCheckboxModule
  ]
})
export class AppMaterialModule { }
src\app\app.module.ts
    AppMaterialModule

Adding Radio Buttons, Slide Toggle, Slider, Progress Bar and Spinner

Creating an App using the Firebase Console
https://console.firebase.google.com
Creating a Firebase App on the Firebase Console - YouTube
Firebase User Authentication Masterclass with Angular
SiddAjmera
1 / 47
https://medium.com/@siddajmera
Angular 9 with Firebase Cloud Database


<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAmm03SZzt1dF5nqyvNCf_VlO45787ntWk",
    authDomain: "my-sample-project-cf00d.firebaseapp.com",
    databaseURL: "https://my-sample-project-cf00d.firebaseio.com",
    projectId: "my-sample-project-cf00d",
    storageBucket: "my-sample-project-cf00d.appspot.com",
    messagingSenderId: "558586018838",
    appId: "1:558586018838:web:07e5252ad339f4e86a0937",
    measurementId: "G-CD60KHCZT1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>

Setting up your Angular CLI Project to support Firebase
npm i firebase angularfire2 --save
src\app\app.module.ts
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
src\environments
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAmm03SZzt1dF5nqyvNCf_VlO45787ntWk",
    authDomain: "my-sample-project-cf00d.firebaseapp.com",
    databaseURL: "https://my-sample-project-cf00d.firebaseio.com",
    projectId: "my-sample-project-cf00d",
    storageBucket: "my-sample-project-cf00d.appspot.com",
    messagingSenderId: "558586018838",
    appId: "1:558586018838:web:07e5252ad339f4e86a0937",
    measurementId: "G-CD60KHCZT1"
  }
};
src\app\services\user\user.service.ts
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

private userList: AngularFireList<any>;

  constructor(
    private http: HttpClient,
    private firebase: AngularFireDatabase
    ) {
      this.userList = this.firebase.list('users');
    }


Interacting with Firebase Realtime Database using methods on AngularFireList
src/app/interfaces/user.ts
 export interface IUser {
+  $key?: string;
src\app\services\user\user.service.ts
  getUsersFromFirebase() {
    return this.userList;
  }

  addAUserToFirebase(user: IUser) {
    this.userList.push(user);
  }

  updateAUserOnFirebase(user: IUser) {
    let $key = user.$key;
    delete user.$key;
    this.userList.update($key, user);
  }

  deleteAUserFromFirebase($key: string) {
    this.userList.remove($key);
  }

Adding and Reading Data from Realtime Database in Firebase
src\app\components\new-user\new-user.component.html
      <pre>
      {{ userForm.value | json }}
    </pre>
      <hr>
      <button class="btn btn-primary" type="submit">Submit</button>
      <button class="btn btn-primary" type="button" (click)="updateUser(userForm)">Update User</button>
      <button class="btn btn-primary" type="button" (click)="deleteUser()">Delete User</button>
      <!-- [disabled]="userForm.invalid" -->
    </form>
  </div>
  <div class="col-md-7">
    <pre>
      {{ userList | json }}
    </pre>
    <button class="btn-primary" type="button" (click)="getUsers()">Get Users</button>
  </div>

Updating and Deleting Data from Realtime Database in Firebase
src\app\components\new-user\new-user.component.ts
  submit(userForm: NgForm) {
    console.log('Form Submitted!', userForm);
    this.userService.addAUserToFirebase(userForm.value);
  }

  getUsers() {
    this.userService.getUsersFromFirebase().snapshotChanges().forEach(usersSnapshot => {
      this.userList = [];
      usersSnapshot.forEach(userSnapshot => {
        let user = userSnapshot.payload.toJSON();
        user['$key'] = userSnapshot.key;
        this.userList.push(user as IUser);
      })
    })
  }

  updateUser(userForm: NgForm) {
    this.userList[1].name = userForm.value.name;
    this.userService.updateAUserOnFirebase(this.userList[1]);
  }

  deleteUser() {
    this.userService.deleteAUserFromFirebase(this.userList[1].$key);
  }

fix bootstrap grid column issue
src/app/components/new-user/new-user.component.html 
@@ -1,4 +1,4 @@
<div class="container">	<div class="row">
  <div class="col-md-5">	  <div class="col-md-5">
    <h3>New User Form</h3>	    <h3>New User Form</h3>
    <form #userForm="ngForm" (ngSubmit)="submit(userForm)">	    <form #userForm="ngForm" (ngSubmit)="submit(userForm)">


# MyFirstMD

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
