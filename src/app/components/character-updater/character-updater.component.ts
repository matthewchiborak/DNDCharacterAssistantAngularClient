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

	character: Partial<Character> = {};
	private theUrl: string = "";
	
	@ViewChild('nameBox') nameBox: any = null;
	@ViewChild('speedBox') speedBox: any = null;
	@ViewChild('acBox') acBox: any = null;
	@ViewChild('proficiencyBox') proficiencyBox: any = null;
	@ViewChild('hpBox') hpBox: any = null;
	@ViewChild('strengthScoreBox') strengthScoreBox: any = null;
	@ViewChild('dexterityScoreBox') dexterityScoreBox: any = null;
	@ViewChild('constitutionScoreBox') constitutionScoreBox: any = null;
	@ViewChild('intelligenceScoreBox') intelligenceScoreBox: any = null;
	@ViewChild('wisdomScoreBox') wisdomScoreBox: any = null;
	@ViewChild('charismaScoreBox') charismaScoreBox: any = null;
	@ViewChild('hitDieBox') hitDieBox: any = null;
	@ViewChild('hitDieDiceBox') hitDieDiceBox: any = null;
	@ViewChild('level1SlotsBox') level1SlotsBox: any = null;
	@ViewChild('level2SlotsBox') level2SlotsBox: any = null;
	@ViewChild('level3SlotsBox') level3SlotsBox: any = null;
	@ViewChild('level4SlotsBox') level4SlotsBox: any = null;
	@ViewChild('level5SlotsBox') level5SlotsBox: any = null;
	@ViewChild('level6SlotsBox') level6SlotsBox: any = null;
	@ViewChild('level7SlotsBox') level7SlotsBox: any = null;
	@ViewChild('level8SlotsBox') level8SlotsBox: any = null;
	@ViewChild('level9SlotsBox') level9SlotsBox: any = null;
	@ViewChild('strengthSaveThrowBox') strengthSaveThrowBox: any = null;
	@ViewChild('dexteritySaveThrowBox') dexteritySaveThrowBox: any = null;
	@ViewChild('constitutionSaveThrowBox') constitutionSaveThrowBox: any = null;
	@ViewChild('intelligenceSaveThrowBox') intelligenceSaveThrowBox: any = null;
	@ViewChild('wisdomSaveThrowBox') wisdomSaveThrowBox: any = null;
	@ViewChild('charismaSaveThrowBox') charismaSaveThrowBox: any = null;
	@ViewChild('AcrobaticsSkillBox') AcrobaticsSkillBox: any = null;
	@ViewChild('AnimalHandlingSkillBox') AnimalHandlingSkillBox: any = null;
	@ViewChild('ArcanaSkillBox') ArcanaSkillBox: any = null;
	@ViewChild('AthleticsSkillBox') AthleticsSkillBox: any = null;
	@ViewChild('DeceptionSkillBox') DeceptionSkillBox: any = null;
	@ViewChild('HistorySkillBox') HistorySkillBox: any = null;
	@ViewChild('InsightSkillBox') InsightSkillBox: any = null;
	@ViewChild('IntimidationSkillBox') IntimidationSkillBox: any = null;
	@ViewChild('InvestigationSkillBox') InvestigationSkillBox: any = null;
	@ViewChild('MedicineSkillBox') MedicineSkillBox: any = null;
	@ViewChild('NatureSkillBox') NatureSkillBox: any = null;
	@ViewChild('PerceptionSkillBox') PerceptionSkillBox: any = null;
	@ViewChild('PerformanceSkillBox') PerformanceSkillBox: any = null;
	@ViewChild('PersuasionSkillBox') PersuasionSkillBox: any = null;
	@ViewChild('ReligionSkillBox') ReligionSkillBox: any = null;
	@ViewChild('SleightofHandSkillBox') SleightofHandSkillBox: any = null;
	@ViewChild('StealthSkillBox') StealthSkillBox: any = null;
	@ViewChild('SurvivalSkillBox') SurvivalSkillBox: any = null;

	@ViewChild('attackNameBox') attackNameBox: any = null;
	@ViewChild('attackLevelBox') attackLevelBox: any = null;
	@ViewChild('attackRollBox') attackRollBox: any = null;
	@ViewChild('damageRollBox') damageRollBox: any = null;
	@ViewChild('attackReferenceLinkBox') attackReferenceLinkBox: any = null;
	@ViewChild('addedAttacksDiv') addedAttacksDiv: any = null;

	@ViewChild('counterNameBox') counterNameBox: any = null;
	@ViewChild('counterMaxBox') counterMaxBox: any = null;
	@ViewChild('addedCountersDiv') addedCountersDiv: any = null;
	
	@ViewChild('referenceNameBox') referenceNameBox: any = null;
	@ViewChild('referenceLinkBox') referenceLinkBox: any = null;
	@ViewChild('addedReferencesDiv') addedReferencesDiv: any = null;
	
	@ViewChild('deleteAttackBox') deleteAttackBox: any = null;
	@ViewChild('deleteCounterBox') deleteCounterBox: any = null;
	@ViewChild('deleteReferenceBox') deleteReferenceBox: any = null;

  constructor(private characterUpdaterService: CharacterUpdaterService, private characterSheetService: CharacterSheetService, private router: Router) { }

  ngOnInit(): void {
	  this.populateFields();
  }

  populateFields(): void {
	  	this.theUrl = this.router.url;
		this.theUrl = this.theUrl.substring(this.theUrl.lastIndexOf('/') + 1);
	  
		this.characterSheetService.getCharacter(this.theUrl).subscribe((character) => {
			this.character = character;
			this.refreshAttacks();
			this.refreshCounters();
			this.refreshReferences();
			this.refreshCheckBoxes();
		});
  }
  
  refreshCheckBoxes(): void {
	 
	 this.strengthSaveThrowBox.nativeElement.checked = this.character.strength;
	 this.dexteritySaveThrowBox.nativeElement.checked = this.character.dexterity;
	 this.constitutionSaveThrowBox.nativeElement.checked = this.character.constitution;
	 this.intelligenceSaveThrowBox.nativeElement.checked = this.character.intelligence;
	 this.wisdomSaveThrowBox.nativeElement.checked = this.character.wisdom;
	 this.charismaSaveThrowBox.nativeElement.checked = this.character.charisma;

	 for(let i = 0; i < this.character.skills.length; i++) {
		 
		 if(this.character.skills[i].name == "Acrobatics (Dex)")
			 this.AcrobaticsSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Animal Handling (Wis)")
			 this.AnimalHandlingSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Arcana (Int)")
			 this.ArcanaSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Athletics (Str)")
			 this.AthleticsSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Deception (Cha)")
			 this.DeceptionSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "History (Int)")
			 this.HistorySkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Insight (Wis)")
			 this.InsightSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Intimidation (Cha)")
			 this.IntimidationSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Investigation (Int)")
			 this.InvestigationSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Medicine (Wis)")
			 this.MedicineSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Nature (Int)")
			 this.NatureSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Perception (Wis)")
			 this.PerceptionSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Performance (Cha)")
			 this.PerformanceSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Persuasion (Cha)")
			 this.PersuasionSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Religion (Int)")
			 this.ReligionSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Sleight of Hand (Dex)")
			 this.SleightofHandSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Stealth (Dex)")
			 this.StealthSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 if(this.character.skills[i].name == "Survival (Wis)")
			 this.SurvivalSkillBox.nativeElement.checked = this.character.skills[i].proficient;
		 
	 }	 
  }
  
    refreshAttacks(): void {
	  let newInner = " ";
	  
	  for(let i = 0; i < this.character.attacks.length; i++) {
		  newInner += '<li>' + this.character.attacks[i].name 
		  + " | " + this.character.attacks[i].level 
		  + " | " + this.character.attacks[i].attackRoll
		  + " | " + this.character.attacks[i].damageRoll
		  + " | " + this.character.attacks[i].referenceLink
		  + '</li>';
	  }
	  
	  this.addedAttacksDiv.nativeElement.innerHTML = '<ol type="1">' + newInner + "</ol>";
  }
  
  addAttack(): void {
	  	  let newAttack = {
            "name": this.attackNameBox.nativeElement.value,
            "level": this.attackLevelBox.nativeElement.value,
            "attackRoll": this.attackRollBox.nativeElement.value,
			"damageRoll": this.damageRollBox.nativeElement.value,
            "id": Math.floor(Math.random() * 100000),
			"referenceLink" : this.attackReferenceLinkBox.nativeElement.value
        };
		
		this.character.attacks.push(newAttack);
		this.refreshAttacks();
  }
  
    deleteAttack(): void {
	  
	  if(this.deleteAttackBox.nativeElement.value > 0 && this.deleteAttackBox.nativeElement.value <= this.character.attacks.length)
		this.character.attacks.splice(this.deleteAttackBox.nativeElement.value-1, 1);
	this.refreshAttacks();
  }
  
  /////////////
  
  refreshCounters(): void {
	  
	  let newInner = " ";
	  
	  for(let i = 0; i < this.character.counters.length; i++) {
		  newInner += '<li>' + this.character.counters[i].name + ": " + this.character.counters[i].maxCount + '</li>';
	  }
	  
	  this.addedCountersDiv.nativeElement.innerHTML = '<ol type="1">' + newInner + "</ol>";
  }
  
  addCounter(): void {
	  let newCounter = {
            "name": this.counterNameBox.nativeElement.value,
            "currentCount": 0,
            "maxCount": this.counterMaxBox.nativeElement.value,
            "id": Math.floor(Math.random() * 100000)
        };
		
		this.character.counters.push(newCounter);
		this.refreshCounters();
  }
  
      deleteCounter(): void {
	  
	  if(this.deleteCounterBox.nativeElement.value > 0 && this.deleteCounterBox.nativeElement.value <= this.character.counters.length)
		this.character.counters.splice(this.deleteCounterBox.nativeElement.value-1, 1);
	this.refreshCounters();
  }
  
  /////////////
  
  refreshReferences(): void {
	  let newInner = " ";
	  
	  for(let i = 0; i < this.character.references.length; i++) {
		  newInner += '<li>' + this.character.references[i].name + ": " + this.character.references[i].link + '</li>';
	  }
	  
	  this.addedReferencesDiv.nativeElement.innerHTML = '<ol type="1">' + newInner + "</ol>";
  }
  
  addReference(): void {
	  	  let newReference = {
            "name": this.referenceNameBox.nativeElement.value,
            "link": this.referenceLinkBox.nativeElement.value
        };
				
		this.character.references.push(newReference);
		this.refreshReferences();
  }
  
      deleteReference(): void {
	  
	  if(this.deleteReferenceBox.nativeElement.value > 0 && this.deleteReferenceBox.nativeElement.value <= this.character.references.length)
		this.character.references.splice(this.deleteReferenceBox.nativeElement.value-1, 1);
	this.refreshReferences();
  }
  
  /////////////
  
  deleteCharacter(): void {
	  		   this.characterUpdaterService.deleteCharacter(this.character).subscribe((response) => {
		   
				alert(response.message);
		   
		   });
  }
  
  saveCharacter(): void {
	  this.character.name = this.nameBox.nativeElement.value;
    this.character.speed = this.speedBox.nativeElement.value;
    this.character.ac = this.acBox.nativeElement.value;
    this.character.proficiencyBonus = this.proficiencyBox.nativeElement.value;
    this.character.strength = this.strengthSaveThrowBox.nativeElement.checked;
    this.character.constitution = this.constitutionSaveThrowBox.nativeElement.checked;
    this.character.charisma = this.charismaSaveThrowBox.nativeElement.checked;
    this.character.dexterity = this.dexteritySaveThrowBox.nativeElement.checked;
    this.character.intelligence = this.intelligenceSaveThrowBox.nativeElement.checked;
    this.character.wisdom = this.wisdomSaveThrowBox.nativeElement.checked;
    this.character.currentHP = this.hpBox.nativeElement.value;
    this.character.maxHP = this.hpBox.nativeElement.value;
    this.character.strengthScore = this.strengthScoreBox.nativeElement.value;
    this.character.constitutionScore = this.constitutionScoreBox.nativeElement.value;
    this.character.charismaScore = this.charismaScoreBox.nativeElement.value;
    this.character.dexterityScore = this.dexterityScoreBox.nativeElement.value;
    this.character.intelligenceScore = this.intelligenceScoreBox.nativeElement.value;
    this.character.wisdomScore = this.wisdomScoreBox.nativeElement.value;
    this.character.currentHitDie = this.hitDieBox.nativeElement.value;
    this.character.maxHitDie = this.hitDieBox.nativeElement.value;
	this.character.hitDieDice = this.hitDieDiceBox.nativeElement.value;
    this.character.currentSlots1 = this.level1SlotsBox.nativeElement.value;
    this.character.currentSlots2 = this.level2SlotsBox.nativeElement.value;
    this.character.currentSlots3 = this.level3SlotsBox.nativeElement.value;
    this.character.currentSlots4 = this.level4SlotsBox.nativeElement.value;
    this.character.currentSlots5 = this.level5SlotsBox.nativeElement.value;
    this.character.currentSlots6 = this.level6SlotsBox.nativeElement.value;
    this.character.currentSlots7 = this.level7SlotsBox.nativeElement.value;
    this.character.currentSlots8 = this.level8SlotsBox.nativeElement.value;
	this.character.currentSlots9 = this.level9SlotsBox.nativeElement.value;
    this.character.maxSlots1 = this.level1SlotsBox.nativeElement.value;
    this.character.maxSlots2 = this.level2SlotsBox.nativeElement.value;
    this.character.maxSlots3 = this.level3SlotsBox.nativeElement.value;
    this.character.maxSlots4 = this.level4SlotsBox.nativeElement.value;
    this.character.maxSlots5 = this.level5SlotsBox.nativeElement.value;
    this.character.maxSlots6 = this.level6SlotsBox.nativeElement.value;
	this.character.maxSlots7 = this.level7SlotsBox.nativeElement.value;
	this.character.maxSlots8 = this.level8SlotsBox.nativeElement.value;
    this.character.maxSlots9 = this.level9SlotsBox.nativeElement.value;
	
	this.character.skills.length = 0;
    
	let newSkill = {
		    "skill": "Dexterity",
            "name": "Acrobatics (Dex)",
            "id": 13,
            "proficient": this.AcrobaticsSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Wisdom",
            "name": "Animal Handling (Wis)",
            "id": 14,
            "proficient": this.AnimalHandlingSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Intelligence",
            "name": "Arcana (Int)",
            "id": 11,
            "proficient": this.ArcanaSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Strength",
            "name": "Athletics (Str)",
            "id": 18,
            "proficient": this.AthleticsSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Charisma",
            "name": "Deception (Cha)",
            "id": 4,
            "proficient": this.DeceptionSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Intelligence",
            "name": "History (Int)",
            "id": 16,
            "proficient": this.HistorySkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Wisdom",
            "name": "Insight (Wis)",
            "id": 12,
            "proficient": this.InsightSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Charisma",
            "name": "Intimidation (Cha)",
            "id": 2,
            "proficient": this.IntimidationSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Intelligence",
            "name": "Investigation (Int)",
            "id": 3,
            "proficient": this.InvestigationSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Wisdom",
            "name": "Medicine (Wis)",
            "id": 15,
            "proficient": this.MedicineSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Intelligence",
            "name": "Nature (Int)",
            "id": 7,
            "proficient": this.NatureSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Wisdom",
            "name": "Perception (Wis)",
            "id": 9,
            "proficient": this.PerceptionSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Charisma",
            "name": "Performance (Cha)",
            "id": 10,
            "proficient": this.PerformanceSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Charisma",
            "name": "Persuasion (Cha)",
            "id": 1,
            "proficient": this.PersuasionSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);	
	newSkill = {
            "skill": "Intelligence",
            "name": "Religion (Int)",
            "id": 6,
            "proficient": this.ReligionSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Dexterity",
            "name": "Sleight of Hand (Dex)",
            "id": 5,
            "proficient": this.SleightofHandSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Dexterity",
            "name": "Stealth (Dex)",
            "id": 17,
            "proficient": this.StealthSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	newSkill = {
            "skill": "Wisdom",
            "name": "Survival (Wis)",
            "id": 8,
            "proficient": this.SurvivalSkillBox.nativeElement.checked
	};
	this.character.skills.push(newSkill);
	
		   this.characterUpdaterService.updateCharacter(this.character).subscribe((response) => {
		   
				alert(response.message);
		   
		   });
  }
}
