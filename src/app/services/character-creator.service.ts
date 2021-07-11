import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character';
import { ServerMessage } from '../models/serverMessage';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CharacterCreatorService {

	private apiUrl = 'http://localhost:6039/characters';

  constructor(private http: HttpClient) { }
  
  createCharacter(character: Partial<Character>): Observable<ServerMessage> {
	  return this.http.post<ServerMessage>(this.apiUrl, character, httpOptions);
  }
}
