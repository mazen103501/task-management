import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import {
  moveTask,
  transferTask,
  deleteTask,
  setSearchQuery,
  setFilterCriteria,
} from '../../state/tasks.actions';
import {
  selectPendingTasks,
  selectInProgressTasks,
  selectCompletedTasks,
  selectFilteredCompletedTasks,
  selectFilteredInProgressTasks,
  selectFilteredPendingTasks,
  selectFilterCriteria,
  selectSearchQuery,
} from '../../state/tasks.selectors';
import { Priority, Status, Task } from '../../../core/models/task.model';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  pending$: Observable<Task[]> = this.store.select(selectFilteredPendingTasks);
  inProgress$: Observable<Task[]> = this.store.select(
    selectFilteredInProgressTasks
  );
  completed$: Observable<Task[]> = this.store.select(
    selectFilteredCompletedTasks
  );
  priorities = Object.values(Priority);
  users: string[] = [];
  statusEnum = Status;
  searchQuery: string = '';
  filterCriteria: { priority?: Priority; assignedTo?: string } = {};

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
    this.store.select(selectFilterCriteria).subscribe((criteria) => {
      console.log(criteria);
      this.filterCriteria = criteria;
    });
    this.store.select(selectSearchQuery).subscribe((query) => {
      this.searchQuery = query;
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.store.dispatch(setSearchQuery({ query: inputElement.value }));
  }

  onFilter(event: Event, filterType: 'priority' | 'assignedTo') {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    this.store
      .select(selectFilterCriteria)
      .pipe(take(1))
      .subscribe((currentCriteria) => {
        const criteria = {
          ...currentCriteria,
          [filterType]: value || undefined,
        };
        this.store.dispatch(setFilterCriteria({ criteria }));
      });
  }

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
}
