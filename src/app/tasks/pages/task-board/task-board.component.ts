import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { moveTask, transferTask, deleteTask } from '../../state/tasks.actions';
import {
  selectPendingTasks,
  selectInProgressTasks,
  selectCompletedTasks,
} from '../../state/tasks.selectors';
import { Status, Task } from '../../../core/models/task.model';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  pending$: Observable<Task[]> = this.store.select(selectPendingTasks);
  inProgress$: Observable<Task[]> = this.store.select(selectInProgressTasks);
  completed$: Observable<Task[]> = this.store.select(selectCompletedTasks);

  statusEnum = Status;

  constructor(private store: Store, private dialog: MatDialog) {}

  drop(event: CdkDragDrop<any>, list: Status) {
    if (event.previousContainer === event.container) {
      this.store.dispatch(
        moveTask({
          previousIndex: event.previousIndex,
          currentIndex: event.currentIndex,
          list,
        })
      );
    } else {
      this.store.dispatch(
        transferTask({
          previousIndex: event.previousIndex,
          currentIndex: event.currentIndex,
          previousList: event.previousContainer.id as Status,
          currentList: event.container.id as Status,
        })
      );
    }
  }

  deleteTask(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteTask({ taskId }));
      }
    });
  }

  checkData() {
    // Get all tasks from different states
    this.store
      .select(selectPendingTasks)
      .pipe(take(1))
      .subscribe((pendingTasks) => console.log('Pending Tasks:', pendingTasks));

    this.store
      .select(selectInProgressTasks)
      .pipe(take(1))
      .subscribe((inProgressTasks) =>
        console.log('In Progress Tasks:', inProgressTasks)
      );

    this.store
      .select(selectCompletedTasks)
      .pipe(take(1))
      .subscribe((completedTasks) =>
        console.log('Completed Tasks:', completedTasks)
      );
  }
}
