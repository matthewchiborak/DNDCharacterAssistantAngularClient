import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../models/character';

@Component({
  selector: 'app-counter-box',
  templateUrl: './counter-box.component.html',
  styleUrls: ['./counter-box.component.css']
})
export class CounterBoxComponent implements OnInit {

	@Input() counter: any = {};
	@Input() boxId: number = 0;
	@Output() onValueChanged: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


}
