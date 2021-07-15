import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character';
import { ServerMessage } from '../models/serverMessage';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CharacterUpdaterService {

	private apiUrl = environment.apiUrl + 'charactersstats';
	private apiUrlDel = environment.apiUrl + 'characters';

  constructor(private http: HttpClient) { }
  
    updateCharacter(character: Partial<Character>): Observable<ServerMessage> {
	  return this.http.put<ServerMessage>(this.apiUrl, character, httpOptions);
  }
  
	deleteCharacter(character: Partial<Character>): Observable<ServerMessage> {
	  return this.http.delete<ServerMessage>(this.apiUrlDel + "/" + character.id, httpOptions);
  }
}
