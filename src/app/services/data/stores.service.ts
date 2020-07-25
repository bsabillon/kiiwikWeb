import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private afs: AngularFirestore) { }

  getStores(storeUid) {
    return this.afs.collection('stores', ref => ref.where('collaborators', '==', `${storeUid}`) ).snapshotChanges();
  }

  getStore(orderUid) {
    return this.afs.collection('stores').doc(orderUid).valueChanges();
  }

  createStore(record) {
    return this.afs.collection('stores').add(record);
  }

  deleteStore(uid) {
    return this.afs.collection('stores').doc(uid).delete();
  }

  updateStore(uid, record) {
    return this.afs.collection('stores').doc(uid).update(record);
  }

}
