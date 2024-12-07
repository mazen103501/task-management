import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Priority, Status, Task } from '../../../core/models/task.model';
import { addTask, updateTask } from '../../state/tasks.actions';
import { selectTaskById } from '../../state/tasks.selectors';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  users: string[] = [];
  taskId: string | null = null;

  get isEditMode(): boolean {
    return !!this.taskId;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(200)],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', [Validators.required, this.futureDateValidator]],
    });
  }

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.store.select(selectTaskById(this.taskId)).subscribe((task) => {
        if (!task) {
          // !important  ->  redirect there is no task and show angular material snackbar do it later
          return;
        }
        this.taskForm.patchValue(task);
      });
    }
  }

  onFormSubmit() {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
        id: this.taskId ? this.taskId : Math.random().toString(),
      };

      if (this.taskId) {
        this.store.dispatch(updateTask({ task }));
      } else {
        this.store.dispatch(addTask({ task }));
      }

      this.router.navigate(['/tasks']);
    }
  }

  private futureDateValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }
}
