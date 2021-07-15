import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Character } from '../../models/character';
import { ServerMessage } from '../../models/serverMessage';
import { CharacterUpdaterService } from '../../services/character-updater.service';
import { CharacterSheetService } from '../../services/character-sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-updater',
  templateUrl: './character-updater.component.html',
  styleUrls: ['./character-updater.component.css'],
  providers: [CharacterUpdaterService, CharacterSheetService]
})
export class CharacterUpdaterComponent implements OnInit {

	@ViewChild('ModCharacterForm') modCharacterForm: any = null;

	character: Partial<Character> = {};
	private theUrl: string = "";
	
  constructor(private characterUpdaterService: CharacterUpdaterService, private characterSheetService: CharacterSheetService, private router: Router) { }

  ngOnInit(): void {
	  this.populateFields();
  }

  populateFields(): void {
	  	this.theUrl = this.router.url;
		this.theUrl = this.theUrl.substring(this.theUrl.lastIndexOf('/') + 1);
	  
		this.characterSheetService.getCharacter(this.theUrl).subscribe((character) => {
			this.character = character;
			this.modCharacterForm.character = character;
			this.modCharacterForm.refreshFields();
		});
  }
  
  deleteCharacter(): void {
	  		   this.characterUpdaterService.deleteCharacter(this.character).subscribe((response) => {
		   
				alert(response.message);
		   
		   });
  }
  
  saveCharacter(): void {	
		   this.characterUpdaterService.updateCharacter(this.modCharacterForm.character).subscribe((response) => {
		   
				alert(response.message);
		   });
  }
}
