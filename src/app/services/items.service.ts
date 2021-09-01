import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { ProductItems } from '../models/product-items';

import { AccessoriesUpper } from '../models/accessories-upper';
import { AccessoriesItemsUpper } from '../models/accessorries-items-upper';

import { AccessoriesLower} from '../models/accessories-lower';
import { AccessoriesItemsLower } from '../models/accessories-items-lower';

import { Accessories } from '../models/accessories';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsCollection: AngularFirestoreCollection<ProductItems>;
  itemDoc!: AngularFirestoreDocument<ProductItems>;
  items!: Observable<ProductItems[]>;
  item: Observable<ProductItems> | any ;

  accessoriesUpperCollection: AngularFirestoreCollection<Accessories>;
  accessoriesUpperDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesUpper: Observable<Accessories[]> | any;
  accessoryUpper: Observable<Accessories> | any;
  
  accessoriesItemsUpperCollection: AngularFirestoreCollection<Accessories>;
  accessoriesItemsUpperDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesItemsUpper: Observable<Accessories[]> | any;
  accessoryItemsUpper: Observable<Accessories> | any;

  accessoriesLowerCollection: AngularFirestoreCollection<Accessories>;
  accessoriesLowerDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesLower: Observable<Accessories[]> | any;
  accessoryLower: Observable<Accessories> | any;

  accessoriesItemsLowerCollection: AngularFirestoreCollection<Accessories>;
  accessoriesItemsLowerDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesItemsLower: Observable<Accessories[]> | any;
  accessoryItemsLower: Observable<Accessories> | any;



  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('product-items', ref =>
    ref.orderBy('category', 'asc')),
    this.accessoriesUpperCollection = this.afs.collection('accessories-upper', ref =>
    ref.orderBy('type', 'asc'))
    this.accessoriesItemsUpperCollection= this.afs.collection('accessories-items-upper', ref =>
    ref.orderBy('type', 'asc')),
    this.accessoriesLowerCollection= this.afs.collection('accessories-lower', ref =>
    ref.orderBy('type', 'asc')),
    this.accessoriesItemsLowerCollection= this.afs.collection('accessories-items-lower', ref =>
    ref.orderBy('type', 'asc'))
    
   }

   createItem(item: ProductItems){
      
    this.itemsCollection.add(item)
  }

  deleteItem(item: ProductItems){
    this.itemDoc = this.afs.doc(`product-items/${item.id}`);
    this.itemDoc.delete()
  }

  updateItem(item: ProductItems){
    this.itemDoc = this.afs.doc(`product-items/${item.id}`);
    this.itemDoc.update(item)
  }

   getItems(): Observable<ProductItems[]> {
    //get items with the id
    this.items = this.itemsCollection.snapshotChanges().pipe(
    map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ProductItems;
        data.id = action.payload.doc.id;
        return data;
        
      });
    }));
    return this.items;
    
  }

  getItem(id: string): Observable<ProductItems>{
    this.itemDoc = this.afs.doc<ProductItems>(`product-items/${id}`);
    
    this.item = this.itemDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
        
      } else {
        const data = action.payload.data() as ProductItems;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.item;
    
}





    createAccessoriesUpper(accessory: Accessories){
      
      this.accessoriesUpperCollection.add(accessory)
    }

    deleteAccessoriesUpper(accessory: Accessories){
      this.accessoriesUpperDoc = this.afs.doc(`accessories-upper/${accessory.id}`);
      this.accessoriesUpperDoc.delete()
    }

    updateAccessoriesUpper(accessory: Accessories){
      this.accessoriesUpperDoc = this.afs.doc(`accessories-upper/${accessory.id}`);
      this.accessoriesUpperDoc.update(accessory)
    }

    

    getAccessoriesUpper(): Observable<Accessories[]>{
      //get items with the id
   this.accessoryUpper = this.accessoriesUpperCollection.snapshotChanges().pipe(
     map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as Accessories;
         data.id = action.payload.doc.id;
         console.log(this.accessoryUpper)
         return data;
       });
     }));
     return this.accessoryUpper;
  }

  getAccessoryUpper(id: string): Observable<Accessories>{
    this.accessoriesUpperDoc = this.afs.doc<Accessories>(`accessories-upper/${id}`);
    
    this.accessoryUpper = this.accessoriesUpperDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
        
      } else {
        const data = action.payload.data() as Accessories;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.accessoryUpper;
    
}


  createAccessoriesItemsUpper(accessory: Accessories){
      
    this.accessoriesItemsUpperCollection.add(accessory)
  }

  deleteAccessoriesItemsUpper(accessory: Accessories){
    this.accessoriesItemsUpperDoc = this.afs.doc(`accessories-items-upper/${accessory.id}`);
    this.accessoriesItemsUpperDoc.delete()
  }

  updateAccessoriesItemsUpper(accessory: Accessories){
    this.accessoriesItemsUpperDoc = this.afs.doc(`accessories-items-upper/${accessory.id}`);
    this.accessoriesItemsUpperDoc.update(accessory)
  }


    
  getAccessoriesItemsUpper(): Observable<Accessories[]>{
    //get items with the id
 this.accessoryItemsUpper = this.accessoriesItemsUpperCollection.snapshotChanges().pipe(
   map(changes => {
     return changes.map(action => {
       const data = action.payload.doc.data() as Accessories;
       data.id = action.payload.doc.id;
       console.log(this.accessoryItemsUpper)
       return data;
     });
   }));
   return this.accessoryItemsUpper;
}

getAccessoryItemUpper(id: string): Observable<Accessories>{
  this.accessoriesItemsUpperDoc = this.afs.doc<Accessories>(`accessories-items-upper/${id}`);
  
  this.accessoryItemsUpper = this.accessoriesItemsUpperDoc.snapshotChanges().pipe(map(action => {
    if(action.payload.exists === false) {
      return null;
      
    } else {
      const data = action.payload.data() as Accessories;
      data.id = action.payload.id;
      return data;
    }
  }));
  return this.accessoryItemsUpper;
  
}


createAccessoriesLower(accessory: Accessories){  
  this.accessoriesLowerCollection.add(accessory)
}

deleteAccessoriesLower(accessory: Accessories){
  this.accessoriesLowerDoc = this.afs.doc(`accessories-lower/${accessory.id}`);
  this.accessoriesLowerDoc.delete()
}

updateAccessoriesLower(accessory: Accessories){
  this.accessoriesLowerDoc = this.afs.doc(`accessories-lower/${accessory.id}`);
  this.accessoriesLowerDoc.update(accessory)
}


getAccessoriesLower(): Observable<Accessories[]>{
  //get items with the id
this.accessoriesLower = this.accessoriesLowerCollection.snapshotChanges().pipe(
 map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.data() as Accessories;
     data.id = action.payload.doc.id;
     console.log(this.accessoryLower)
     return data;
   });
 }));
 return this.accessoriesLower;
}

getAccessoryLower(id: string): Observable<Accessories>{
  this.accessoriesLowerDoc = this.afs.doc<Accessories>(`accessories-lower/${id}`);
  
  this.accessoryLower = this.accessoriesLowerDoc.snapshotChanges().pipe(map(action => {
    if(action.payload.exists === false) {
      return null;
      
    } else {
      const data = action.payload.data() as Accessories;
      data.id = action.payload.id;
      return data;
    }
  }));
  return this.accessoryLower;
  
}

// AccessoriesItemsLower

createAccessoriesItemsLower(accessory: Accessories){
      
  this.accessoriesItemsLowerCollection.add(accessory)
}

deleteAccessoriesItemsLower(accessory: Accessories){
  this.accessoriesItemsLowerDoc = this.afs.doc(`accessories-items-lower/${accessory.id}`);
  this.accessoriesItemsLowerDoc.delete()
}

updateAccessoriesItemsLower(accessory: Accessories){
  this.accessoriesItemsLowerDoc = this.afs.doc(`accessories-items-lower/${accessory.id}`);
  this.accessoriesItemsLowerDoc.update(accessory)
}


getAccessoriesItemsLower(): Observable<Accessories[]>{
  //get items with the id
this.accessoriesItemsLower = this.accessoriesItemsLowerCollection.snapshotChanges().pipe(
 map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.data() as Accessories;
     data.id = action.payload.doc.id;
     console.log(this.accessoriesItemsLowerCollection)
     return data;
   });
 }));
 return this.accessoriesItemsLower;
}

getAccessoryItemLower(id: string): Observable<Accessories>{
  this.accessoriesItemsLowerDoc = this.afs.doc<Accessories>(`accessories-items-lower/${id}`);
  
  this.accessoryItemsLower = this.accessoriesItemsLowerDoc.snapshotChanges().pipe(map(action => {
    if(action.payload.exists === false) {
      return null;
      
    } else {
      const data = action.payload.data() as Accessories;
      data.id = action.payload.id;
      return data;
    }
  }));
  return this.accessoryItemsLower;
  
}

}
