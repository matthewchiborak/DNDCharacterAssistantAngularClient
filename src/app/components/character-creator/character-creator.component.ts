import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { Character } from '../../models/character';
import { ServerMessage } from '../../models/serverMessage';
import { CharacterCreatorService } from '../../services/character-creator.service';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.css'],
  providers: [CharacterCreatorService]
})
export class CharacterCreatorComponent implements OnInit {

	@ViewChild('CreateCharacterForm') createCharacterForm: any = null;

  character: Partial<Character> = {
    "name": " ",
    "speed": 0,
    "ac": 0,
    "proficiencyBonus": 0,
    "strength": false,
    "constitution": false,
    "charisma": false,
    "dexterity": false,
    "intelligence": false,
    "wisdom": false,
    "currentHP": 0,
    "maxHP": 0,
    "strengthScore": 0,
    "constitutionScore": 0,
    "charismaScore": 0,
    "dexterityScore": 0,
    "intelligenceScore": 0,
    "wisdomScore": 0,
    "currentHitDie": 0,
    "maxHitDie": 0,
	"hitDieDice": 0,
    "currentSlots1": 0,
    "currentSlots2": 0,
    "currentSlots3": 0,
    "currentSlots4": 0,
    "currentSlots5": 0,
    "currentSlots6": 0,
    "currentSlots7": 0,
    "currentSlots8": 0,
    "currentSlots9": 0,
    "maxSlots1": 4,
    "maxSlots2": 3,
    "maxSlots3": 3,
    "maxSlots4": 1,
    "maxSlots5": 0,
    "maxSlots6": 0,
    "maxSlots7": 0,
    "maxSlots8": 0,
    "maxSlots9": 0,
    "skills": [],
    "attacks": [],
    "counters": [],
	"references": []
};

  constructor(private characterCreatorService: CharacterCreatorService) { }
  
  
  ngOnInit(): void {
  }
  
  saveCharacter(): void {
	  	
		   this.characterCreatorService.createCharacter(this.createCharacterForm.character).subscribe((response) => {
		   
				alert(response.message);
		   
		   });
  }
  
}
