import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(loginValue: any) {
    return this.http.post(this.baseUrl + 'account/login', loginValue).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(registerValue: any) {
    return this.http
      .post(this.baseUrl + 'account/register', registerValue)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setCurrentUser(user);
          }
        })
      );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
