import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	private apiUrl = environment.apiUrl + "user";
	private currentUserSubject!: BehaviorSubject<User>;
    public currentUser!: Observable<User>;

  constructor(private http: HttpClient) { 
		let localCurrentUser = localStorage.getItem('currentUser');
		
		if(localCurrentUser) {
				    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localCurrentUser));
					this.currentUser = this.currentUserSubject.asObservable();
		}
  }
  
	public hasUserSubject(): boolean {
		
			if(this.checkIfTokenIsExpired()) {
				this.logout();
				return false;
			}
		
			if(this.currentUserSubject)
				return true;
			return false;
	}
  
    public get currentUserValue(): User {		
        return this.currentUserSubject.value;
    }
	
	public checkIfTokenIsExpired(): boolean {
		let tokenToCheck = localStorage.getItem('id_token');
		
		if(!tokenToCheck) {
			return false; //Token does not exist
		}
		
		 const expiry = (JSON.parse(atob(tokenToCheck.split('.')[1]))).exp;
		 return (Math.floor((new Date).getTime() / 1000)) >= expiry;
	}
	
	
    login(username: string, password: string): Observable<User> {
		
				let body = new URLSearchParams();
				body.set('username', username);
				body.set('password', password);
		
				return this.http.post<User>(this.apiUrl, body, httpOptions).pipe(map(user => {
					localStorage.setItem('id_token', user.token);
					localStorage.setItem('currentUser', JSON.stringify(user));
					
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
