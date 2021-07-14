import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterlistService {

	private apiUrl = 'http://localhost:6039/characters';

  constructor(private http: HttpClient) { }
  
  //Retrieving
  getCharacters(): Observable<Character[]> {
	 //let customHeaders = new Headers({ Authorization: localStorage.getItem("id_token")});
	 //const requestOptions: RequestOptionsArgs = { headers: customHeaders };
	 
	 /*const headerDict = {
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'Access-Control-Allow-Headers': 'Content-Type',
		  'Authorization': localStorage.getItem("id_token")
		}

		const requestOptions = {                                                                                                                                                                                 
		  headers: new Headers(headerDict), 
		};*/
	  
	  return this.http.get<Character[]>(this.apiUrl);
  }
  
  
}
