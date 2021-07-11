import { TestBed } from '@angular/core/testing';

import { CharacterUpdaterService } from './character-updater.service';

describe('CharacterUpdaterService', () => {
  let service: CharacterUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
