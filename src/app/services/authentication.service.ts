import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { map, delay, filter, switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public usersCollection: AngularFirestoreCollection<User>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    public database: AngularFirestore,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.usersCollection = this.database.collection<User>('users');
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    );

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe((data) => this.redirect = data['authOnly'] ?? false);
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

  public async logout(event?: Event) {
    if(event) {
      event.preventDefault();
    }

    await this.auth.signOut();

    if(this.redirect) {
      await this.router.navigateByUrl("/");
    }
  }
}
