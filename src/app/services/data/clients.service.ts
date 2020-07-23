import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private afs: AngularFirestore,) { }

  getClients(storeUid) {
    return this.afs.collection('clients', ref => ref.where('storeUid', '==', `${storeUid}`)).snapshotChanges();
  }

  createClient(record) {
    return this.afs.collection('clients').add(record);
  }

  deletClient(uid) {
    return this.afs.collection('clients').doc(uid).delete();
  }

  updateClient(uid, record) {
    return this.afs.collection('clients').doc(uid).update(record);
  }


}
