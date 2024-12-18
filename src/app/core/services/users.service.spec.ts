import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of users', () => {
    const users = service.getUsers();
    expect(users).toEqual([
      'John Doe',
      'Jane Smith',
      'Mike Johnson',
      'Sarah Wilson',
      'Tom Brown',
    ]);
  });
});
