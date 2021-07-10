import { TestBed } from '@angular/core/testing';

import { CharacterCreatorService } from './character-creator.service';

describe('CharacterCreatorService', () => {
  let service: CharacterCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
