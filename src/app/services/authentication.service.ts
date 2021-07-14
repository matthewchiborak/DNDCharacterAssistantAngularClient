import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Login } from '../models/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	private apiUrl = 'http://localhost:6039/user';
	private currentUserSubject!: BehaviorSubject<User>;
    public currentUser!: Observable<User>;
	public loginInfo: Partial<Login> = {};

  constructor(private http: HttpClient) { 
		let localCurrentUser = localStorage.getItem('currentUser');
		
		if(localCurrentUser) {
				    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localCurrentUser));
					this.currentUser = this.currentUserSubject.asObservable();
		}
  }
  
	public hasUserSubject(): boolean {
			if(this.currentUserSubject)
				return true;
			return false;
	}
  
    public get currentUserValue(): User {		
        return this.currentUserSubject.value;
    }
	
    login(username: string, password: string): Observable<User> {
		
				let body = new URLSearchParams();
				body.set('username', username);
				body.set('password', password);
		
				return this.http.post<User>(this.apiUrl, body, httpOptions).pipe(map(user => {
					localStorage.setItem('id_token', user.token);
					localStorage.setItem('currentUser', JSON.stringify(user));
					console.log(user.token);
					
						let localCurrentUser = localStorage.getItem('currentUser');
	
						if(localCurrentUser) {
									this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localCurrentUser));
									this.currentUser = this.currentUserSubject.asObservable();
						}

						return user;
				}));	
    }
	
    logout() {
        // remove user from local storage to log user out
		localStorage.removeItem("id_token");
        localStorage.removeItem('currentUser');
    }
}
