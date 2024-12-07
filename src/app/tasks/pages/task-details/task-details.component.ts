import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../../core/models/task.model';
import { selectTaskById } from '../../state/tasks.selectors';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  task$: Observable<Task | undefined>;

  constructor(private route: ActivatedRoute, private store: Store) {
    const taskId = this.route.snapshot.paramMap.get('id') as string;
    this.task$ = this.store.select(selectTaskById(taskId));
  }
}
