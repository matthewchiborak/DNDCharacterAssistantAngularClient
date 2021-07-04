import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { CharacterSheetService } from '../../services/character-sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css'],
  providers: [CharacterSheetService]
})
export class CharacterSheetComponent implements OnInit {

	//@ViewChild('rollBox') rollBox: ElementRef;

	character: Partial<Character> = {};
	private theUrl: string = "";

  constructor(private characterSheetService: CharacterSheetService, private router: Router) { }

  ngOnInit(): void {
	  
	 this.theUrl = this.router.url;
	 this.theUrl = this.theUrl.substring(this.theUrl.lastIndexOf('/') + 1);
	  
	  this.characterSheetService.getCharacter(this.theUrl).subscribe((character) => {
		  this.character = character;
	  });
  }
  
  copyToClipboard(textToCopy: string): void {
	  //this.rollBox.nativeElement.value = textToCopy;
  }
  
  rollInit(): void {
	  
  }

}
