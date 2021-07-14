import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Character } from '../../models/character';
import { ServerMessage } from '../../models/serverMessage';
import { CharacterSheetService } from '../../services/character-sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css'],
  providers: [CharacterSheetService]
})
export class CharacterSheetComponent implements OnInit {

	@ViewChild('rollBox') rollBox: any = null;
	@ViewChild('hpBox') hpBox: any = null;
	@ViewChild('hitDieBox') hitDieBox: any = null;
	@ViewChild('hitDieToUseBox') hitDieToUseBox: any = null;
	@ViewChild('SlotsBox1') slotsBox1: any = null;
	@ViewChild('SlotsBox2') slotsBox2: any = null;
	@ViewChild('SlotsBox3') slotsBox3: any = null;
	@ViewChild('SlotsBox4') slotsBox4: any = null;
	@ViewChild('SlotsBox5') slotsBox5: any = null;
	@ViewChild('SlotsBox6') slotsBox6: any = null;
	@ViewChild('SlotsBox7') slotsBox7: any = null;
	@ViewChild('SlotsBox8') slotsBox8: any = null;
	@ViewChild('SlotsBox9') slotsBox9: any = null;

	character: Partial<Character> = {};
	private theUrl: string = "";

  constructor(private characterSheetService: CharacterSheetService, private router: Router) { }

  ngOnInit(): void {
		this.getDataAndPopulateFields();
  }
  
  getDataAndPopulateFields(): void {
	  	this.theUrl = this.router.url;
		this.theUrl = this.theUrl.substring(this.theUrl.lastIndexOf('/') + 1);
	  
		this.characterSheetService.getCharacter(this.theUrl).subscribe((character) => {
		this.character = character;
	  });
  }
  
  copyToClipboard(textToCopy: string): void {
	  this.rollBox.nativeElement.value = textToCopy;
	  this.rollBox.nativeElement.select();
	  this.rollBox.nativeElement.setSelectionRange(0, 99999); /* For mobile devices */
	  document.execCommand("copy");
  }
  
  rollInit(): void {
	  
	  let modToUse = this.characterSheetService.convertScoreToMod(this.character.dexterityScore!);
	  
	  	if(modToUse > 0) {
			this.copyToClipboard("/r 1d20+" + modToUse);
		}
		else if(modToUse < 0) {
			this.copyToClipboard("/r 1d20" + modToUse);
		}else {
			this.copyToClipboard("/r 1d20");
		}
  }
  
  getAScore(skill: string): number {
	  if(skill == "str" || skill == "Strength") {
		  return this.character.strengthScore!;
	  }else if(skill == "dex" || skill == "Dexterity") {
		  return this.character.dexterityScore!;
	  }else if(skill == "con" || skill == "Constitution") {
		  return this.character.constitutionScore!;
	  }else if(skill == "intel" || skill == "Intelligence") {
		  return this.character.intelligenceScore!;
	  }else if(skill == "wis" || skill == "Wisdom") {
		  return this.character.wisdomScore!;
	  }else if(skill == "cha" || skill == "Charisma") {
		  return this.character.charismaScore!;
	  }
	  
	  return 0;
  }
  
  saveThrowPressed(skill: string): void {
	  
	  let modToUse = this.getAScore(skill);
	  let isProf = false;
	  
	  if(skill == "str") {
		  isProf = this.character.strength!;
	  }else if(skill == "dex") {
		  isProf = this.character.dexterity!;
	  }else if(skill == "con") {
		  isProf = this.character.constitution!;
	  }else if(skill == "intel") {
		  isProf = this.character.intelligence!;
	  }else if(skill == "wis") {
		  isProf = this.character.wisdom!;
	  }else if(skill == "cha" ) {
		  isProf = this.character.charisma!;
	  }
	  
	  modToUse = this.characterSheetService.convertScoreToMod(modToUse!);
	  
	  if(isProf) {
		  modToUse += this.character.proficiencyBonus!;
	  }
	  
	  	if(modToUse > 0) {
			this.copyToClipboard("/r 1d20+" + modToUse);
		}
		else if(modToUse < 0) {
			this.copyToClipboard("/r 1d20" + modToUse);
		}else {
			this.copyToClipboard("/r 1d20");
		}
  }
  
   rollHitDie(): void{
	   let numToUse = this.hitDieToUseBox.nativeElement.value;
	   this.hitDieBox.nativeElement.value = this.hitDieBox.nativeElement.value - numToUse;
	   this.copyToClipboard("/r " + numToUse + "d" + this.character.hitDieDice);
   }

   skillRoll(abilityIndex: number): void {
	   	  let modToUse = this.getAScore(this.character.skills[abilityIndex].skill);
		  let isProf = this.character.skills[abilityIndex].proficient;
		  		  
		  modToUse = this.characterSheetService.convertScoreToMod(modToUse!);
		  
		  if(isProf) {
			  modToUse += this.character.proficiencyBonus!;
		  }
		  
			if(modToUse > 0) {
				this.copyToClipboard("/r 1d20+" + modToUse);
			}
			else if(modToUse < 0) {
				this.copyToClipboard("/r 1d20" + modToUse);
			}else {
				this.copyToClipboard("/r 1d20");
			}
   }
   
   makeAttackRoll(attackRoll: string, damageRoll: string, level: number): void {
	   this.copyToClipboard(attackRoll + "\n"+ damageRoll);
	   
	   if(level == 1) {
		   if(this.slotsBox1.nativeElement.value > 0)
			   this.slotsBox1.nativeElement.value -= 1;
	   }
	   if(level == 2) {
		   if(this.slotsBox2.nativeElement.value > 0)
			   this.slotsBox2.nativeElement.value -= 1;
	   }
	   if(level == 3) {
		   if(this.slotsBox3.nativeElement.value > 0)
			   this.slotsBox3.nativeElement.value -= 1;
	   }
	   if(level == 4) {
		   if(this.slotsBox4.nativeElement.value > 0)
			   this.slotsBox4.nativeElement.value -= 1;
	   }
	   if(level == 5) {
		   if(this.slotsBox5.nativeElement.value > 0)
			   this.slotsBox5.nativeElement.value -= 1;
	   }
	   if(level == 6) {
		   if(this.slotsBox6.nativeElement.value > 0)
			   this.slotsBox6.nativeElement.value -= 1;
	   }
	   if(level == 7) {
		   if(this.slotsBox7.nativeElement.value > 0)
			   this.slotsBox7.nativeElement.value -= 1;
	   }
	   if(level == 8) {
		   if(this.slotsBox8.nativeElement.value > 0)
			   this.slotsBox8.nativeElement.value -= 1;
	   }
	   if(level == 9) {
		   if(this.slotsBox9.nativeElement.value > 0)
			   this.slotsBox9.nativeElement.value -= 1;
	   }
   }
   
   openHelp(address: string): void {
	   window.open(address, "Lookup");
   }
   
   saveData(): void {	   
   
		this.character.currentHP = this.hpBox.nativeElement.value;
		this.character.currentHitDie = this.hitDieBox.nativeElement.value;
		this.character.currentSlots1 = this.slotsBox1.nativeElement.value;
		this.character.currentSlots2 = this.slotsBox2.nativeElement.value;
		this.character.currentSlots3 = this.slotsBox3.nativeElement.value;
		this.character.currentSlots4 = this.slotsBox4.nativeElement.value;
		this.character.currentSlots5 = this.slotsBox5.nativeElement.value;
		this.character.currentSlots6 = this.slotsBox6.nativeElement.value;
		this.character.currentSlots7 = this.slotsBox7.nativeElement.value;
		this.character.currentSlots8 = this.slotsBox8.nativeElement.value;
		this.character.currentSlots9 = this.slotsBox9.nativeElement.value;
		
	   this.characterSheetService.updateCharacter(this.character).subscribe((response) => {
		   
		   alert(response.message);
		   
		   });
	   
   }
   
   changeCounterValue(newEvent: any): void {
	   
	   let counterIndex = newEvent.srcElement.id.substring(7);
	   
	   this.character.counters[counterIndex].currentCount = newEvent.srcElement.value;
	   
   }
}
