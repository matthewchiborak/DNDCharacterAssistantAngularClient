import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterUpdaterComponent } from './character-updater.component';

describe('CharacterUpdaterComponent', () => {
  let component: CharacterUpdaterComponent;
  let fixture: ComponentFixture<CharacterUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterUpdaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
