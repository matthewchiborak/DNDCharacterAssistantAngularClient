import { Component, OnInit } from '@angular/core';
import { CharacterlistService } from '../../services/characterlist.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.css'],
  providers: [CharacterlistService]
})
export class CharacterlistComponent implements OnInit {

	characters: Character[] = [];

  constructor(private characterlistService: CharacterlistService) { }

  ngOnInit(): void {
	  this.characterlistService.getCharacters().subscribe((characters) => (this.characters = characters));
  }

}
