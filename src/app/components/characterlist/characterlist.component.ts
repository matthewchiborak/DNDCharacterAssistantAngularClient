import { Component, OnInit } from '@angular/core';
import { CharacterlistService } from '../../services/characterlist.service';
import { Character } from '../../models/character';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.css'],
  providers: [CharacterlistService, AuthenticationService]
})
export class CharacterlistComponent implements OnInit {

	characters: Character[] = [];

  constructor(private characterlistService: CharacterlistService, 
		private authenticationService: AuthenticationService,
		private route: ActivatedRoute,
        private router: Router
		) { }

  ngOnInit(): void {
	  this.characterlistService.getCharacters().subscribe((characters) => (this.characters = characters));
  }
  
  logout(): void {
	  this.authenticationService.logout();
	  this.router.navigate(['/logout']);
  }

}
