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
export class CharacterSheetService {

	private apiUrl = 'http://localhost:6039/characters';

  constructor(private http: HttpClient) { }
  
  getCharacter(id: string): Observable<Character> {
	  return this.http.get<Character>(this.apiUrl + "/" + id);
  }
  
  convertScoreToMod(scoreValue: number): number {	  
	  return (Math.floor(scoreValue / 2) - 5);
  }
  
  updateCharacter(character: Partial<Character>): Observable<ServerMessage> {
	  return this.http.put<ServerMessage>(this.apiUrl, character, httpOptions);
  }
}
