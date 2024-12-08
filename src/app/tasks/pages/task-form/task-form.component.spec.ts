import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskFormComponent } from './task-form.component';
import { tasksReducer } from '../../state/tasks.reducer';
import { UsersService } from '../../../core/services/users.service';
import { SharedModule } from '../../../shared/shared.module';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ tasks: tasksReducer }),
        RouterTestingModule,
        SharedModule,
      ],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: () => ['John Doe', 'Jane Smith'],
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
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

  it('should initialize the form with default values', () => {
    expect(component.taskForm.value).toEqual({
      taskName: '',
      description: '',
      priority: '',
      status: '',
      assignedTo: '',
      dueDate: '',
    });
  });

  it('should dispatch addTask action on form submit', () => {
    const storeSpy = spyOn(component['store'], 'dispatch');
    component.taskForm.setValue({
      taskName: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      status: 'pending',
      assignedTo: 'John Doe',
      dueDate: '2025-12-01',
    });
    component.onFormSubmit();
    expect(storeSpy).toHaveBeenCalled();
  });
});
