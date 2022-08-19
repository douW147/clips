import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public usersCollection: AngularFirestoreCollection<User>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  constructor(
    public auth: AngularFireAuth,
    public database: AngularFirestore
  ) {
    this.usersCollection = this.database.collection<User>('users');
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    );

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
  }

  public async createUser(userData: User) {
    if(!userData.password) {
      throw new Error("Password is not provided!!!");
    }

    const userCredentials = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);
      
    await this.usersCollection.doc(userCredentials.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCredentials.user?.updateProfile({
      displayName: userData.name
    });
  }
}
