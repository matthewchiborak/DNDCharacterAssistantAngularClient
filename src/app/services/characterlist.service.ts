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
	  return this.http.get<Character[]>(this.apiUrl);
  }
  
  
}
