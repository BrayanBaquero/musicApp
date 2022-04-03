import { TestBed } from '@angular/core/testing';

import { AppMusicService } from './app-music.service';

describe('AppMusicService', () => {
  let service: AppMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
