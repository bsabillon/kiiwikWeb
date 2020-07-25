import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private afs: AngularFirestore) { }


  getTransactions(storeUid) {
    return this.afs.collection('transactions', ref => ref.where('storeUid', '==', `${storeUid}`) ).snapshotChanges();
  }

  getTransaction(orderUid) {
    return this.afs.collection('transactions').doc(orderUid).valueChanges();
  }

  createTransaction(record) {
    return this.afs.collection('transactions').add(record);
  }

  deleteTransaction(uid) {
    return this.afs.collection('transactions').doc(uid).delete();
  }

  updateTransaction(uid, record) {
    return this.afs.collection('transactions').doc(uid).update(record);
  }

}
