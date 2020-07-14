import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../models/user.class';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLog = false;
  private isAdmininistrator = false;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router, 
    private afs: AngularFirestore
    ) { 
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
    this.getCurrentUser();
    }

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  private user: Observable<User>;
  private userDoc: AngularFirestoreDocument<User>;
  public selectedUser: User = {
    uid: null
  };
  public currentUser;

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        err => reject(err),
      );
    });
  }

  passwordRecovery(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  createUser(record) {
    return this.afs.collection('users').doc(record.uid).set(record);
  }

  createStore(record) {
    return this.afs.collection('stores').add(record);
  }

  getUser(email) {
    return this.afs.collection('users', ref => ref.where('email', '==', `${email}`)).snapshotChanges();
  }

  getActiveStore(uidStore) {
    return this.afs.collection('stores').doc(uidStore).valueChanges();
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  async onLogOut() {
    console.log("logging out");
    this.afAuth.signOut();
    this.router.navigateByUrl('/auth/login');
  }

  async getCurrentUser() {
    this.afAuth.authState.subscribe((authUser)=>{
      this.getUserByUid(authUser.uid).subscribe((FSuser)=>{
         this.currentUser  = FSuser; 
         //console.log(this.currentUser);
         return this.currentUser;
      })
    }
    )
  }

  getUserByUid(userId: string){
    this.userDoc = this.afs.doc<User>(`users/${userId}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action=>{
      if (action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as User;
        data.uid = action.payload.data().uid;
        return data;
      }
    }));
  }



}
