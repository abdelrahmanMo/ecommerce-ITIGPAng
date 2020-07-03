import { TestBed } from '@angular/core/testing';

import { NotificationToastService } from './notification-toast.service';

describe('NotificationToastService', () => {
  let service: NotificationToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
