import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private afs: AngularFirestore,) { }

  getOrders(storeUid) {
    return this.afs.collection('orders', ref => ref.where('storeUid', '==', `${storeUid}`) ).snapshotChanges();
  }

  getOrder(orderUid) {
    return this.afs.collection('orders').doc(orderUid).valueChanges();
  }

  createOrder(record) {
    return this.afs.collection('orders').add(record);
  }

  deleteOrder(uid) {
    return this.afs.collection('orders').doc(uid).delete();
  }

  updateOrder(uid, record) {
    return this.afs.collection('orders').doc(uid).update(record);
  }

}
