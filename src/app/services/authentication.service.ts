import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Login } from '../models/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
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
		
				return this.http.post<User>(this.apiUrl, {username, password}).pipe(map(user => {
					localStorage.setItem('id_token', user.token);
					return user;
				}));
				
				/*return this.http.post<User>(this.apiUrl, {username, password}).pipe(
					map(user => {

						localStorage.setItem('currentUser', JSON.stringify(user));
						
						let localCurrentUser = localStorage.getItem('currentUser');
	
						if(localCurrentUser) {
									this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localCurrentUser));
									this.currentUser = this.currentUserSubject.asObservable();
						}

						return user;
					})
				);*/
				
    }
	
	//private setSession(authResult) {
		//const expiresAt = moment().add(authResult.expiresIn,'second');

       // localStorage.setItem('id_token', authResult.idToken);
        //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
	//}

    logout() {
        // remove user from local storage to log user out
		localStorage.removeItem("id_token");
        //localStorage.removeItem("expires_at");
        //localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }
	
	public isLoggedIn() {
		
        //return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        //return !this.isLoggedIn();
    }

    getExpiration() {
        //const expiration = localStorage.getItem("expires_at");
        //const expiresAt = JSON.parse(expiration);
        //return moment(expiresAt);
    }   
}
