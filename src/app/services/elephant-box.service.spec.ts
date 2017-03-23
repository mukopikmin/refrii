import { TestBed, inject } from '@angular/core/testing';

import { ElephantBoxService } from './elephant-box.service';

describe('ElephantBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElephantBoxService]
    });
  });

  it('should ...', inject([ElephantBoxService], (service: ElephantBoxService) => {
    expect(service).toBeTruthy();
  }));
});
