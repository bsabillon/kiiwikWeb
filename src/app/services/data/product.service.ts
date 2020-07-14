import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  createCategory(record) {
    return this.afs.collection('productCategory').add(record);
  }

  createProduct(record) {
    return this.afs.collection('product').add(record);
  }

  getCategories(storeUid) {
    return this.afs.collection('productCategory', ref => ref.where('storeUid', '==', `${storeUid}`)).snapshotChanges();
  }

  getProducts(storeUid) {
    return this.afs.collection('product', ref => ref.where('storeUid', '==', `${storeUid}`)).snapshotChanges();
  }

  deleteCategory(uid) {
    return this.afs.collection('productCategory').doc(uid).delete();
  }

  deleteProduct(uid) {
    return this.afs.collection('product').doc(uid).delete();
  }

  updateProduct(uid, record) {
    return this.afs.collection('product').doc(uid).update(record);
  }

}
