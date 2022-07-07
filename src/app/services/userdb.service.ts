import { Injectable } from '@angular/core';
import { AngularFireAuth,} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { UserInterface } from '../components/models/user';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserdbService {

  public usersCollections: AngularFirestoreCollection<UserInterface>;
  public users: Observable<UserInterface[]>;
  public userDoc: AngularFirestoreDocument<UserInterface> | undefined ;

  constructor(private afsAuth:AngularFireAuth,private afs:AngularFirestore,) { 
    this.usersCollections=afs.collection<UserInterface>('users', ref=>ref.orderBy('email','asc'));
    this.users= this.usersCollections.snapshotChanges().pipe(
      map((actions) => actions.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createDoc(data:any, path: string, id:string){
    const collection = this.afs.collection(path);
    return collection.doc(id).set(data)
   }

    getUsers() {
      return this.users;
    }

    getUser(id: string) {
      return this.usersCollections.doc<UserInterface>(id).valueChanges();
    }

    updateuser(user:UserInterface){
      let idUser=user.id
      this.userDoc= this.afs.doc<UserInterface>(`users/${idUser}`);
      this.userDoc.update(user)
    }
    deleteuser(user:UserInterface){
      let idUser=user.id
      this.userDoc= this.afs.doc<UserInterface>(`users/${idUser}`);
      this.userDoc.delete()
    }
  
}
