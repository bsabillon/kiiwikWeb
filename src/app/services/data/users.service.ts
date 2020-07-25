import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore) { }

  getUsers(storeUid) {
    return this.afs.collection('users', ref => ref.where('collaborators', '==', `${storeUid}`) ).snapshotChanges();
  }

  getUser(orderUid) {
    return this.afs.collection('users').doc(orderUid).valueChanges();
  }

  createUser(record) {
    return this.afs.collection('users').add(record);
  }

  deleteUser(uid) {
    return this.afs.collection('users').doc(uid).delete();
  }

  updateUser(uid, record) {
    return this.afs.collection('users').doc(uid).update(record);
  }



}
