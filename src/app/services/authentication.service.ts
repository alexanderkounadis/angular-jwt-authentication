import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

private currentUserSubject = new  BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
public currentUser$: Observable<User> = this.currentUserSubject.asObservable();

constructor(private http: HttpClient) { }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, {username, password})
        .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  logout() {
     // remove user from local storage to log user out
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
  }
}
