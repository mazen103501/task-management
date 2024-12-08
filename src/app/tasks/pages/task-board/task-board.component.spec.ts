import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskBoardComponent } from './task-board.component';
import { tasksReducer } from '../../state/tasks.reducer';
import { UsersService } from '../../../core/services/users.service';
import { of } from 'rxjs';
import { setSearchQuery, setFilterCriteria } from '../../state/tasks.actions';
import { Priority } from '../../../core/models/task.model';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskBoardComponent],
      imports: [
        StoreModule.forRoot({ tasks: tasksReducer }),
        MatDialogModule,
        SharedModule,
      ],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: () => ['John Doe', 'Jane Smith'],
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    spyOn(usersService, 'getUsers').and.returnValue(['John Doe', 'Jane Smith']);
    component.ngOnInit();
    expect(component.users).toEqual(['John Doe', 'Jane Smith']);
  });

  it('should dispatch setSearchQuery action on search', () => {
    const storeSpy = spyOn(component['store'], 'dispatch');
    const event = { target: { value: 'test' } } as any;
    component.onSearch(event);
    expect(storeSpy).toHaveBeenCalledWith(setSearchQuery({ query: 'test' }));
  });

  it('should dispatch setFilterCriteria action on filter', () => {
    const storeSpy = spyOn(component['store'], 'dispatch');
    const event = { target: { value: Priority.High } } as any;
    component.onFilter(event, 'priority');
    expect(storeSpy).toHaveBeenCalledWith(
      setFilterCriteria({ criteria: { priority: Priority.High } })
    );
  });
});
