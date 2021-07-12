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

	private apiUrl = 'http://localhost:6039/users/authenticate';
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

    login(username: string, password: string): void {
		
				this.loginInfo.username = username;
				this.loginInfo.password = password;
				
				this.http.post<User>(this.apiUrl, this.loginInfo, httpOptions).subscribe((user) => {
					user.authdata = window.btoa(username + ':' + password);
					localStorage.setItem('currentUser', JSON.stringify(user));
					
					if(this.currentUser) {
						this.currentUserSubject = new BehaviorSubject<User>(user);
						this.currentUser = this.currentUserSubject.asObservable();
					}
					
					//this.currentUserSubject.next(user);
				});
								
        //return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { "username": username, "password": password })
		/*return this.http.post<User>(this.apiUrl, this.loginInfo, httpOptions).pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
				
				if(this.currentUser) {
				    this.currentUserSubject = new BehaviorSubject<User>(user);
					this.currentUser = this.currentUserSubject.asObservable();
				}
				
                this.currentUserSubject.next(user);
                return user;
            }));*/
			
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }
}
