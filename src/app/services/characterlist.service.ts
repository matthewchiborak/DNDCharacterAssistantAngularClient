import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterlistService {

	private apiUrl = environment.apiUrl + 'characters';

  constructor(private http: HttpClient) { }
  
  getCharacters(): Observable<Character[]> {

	  return this.http.get<Character[]>(this.apiUrl);//, httpOptions);
  }
  
  
}
