import { createAction, props } from '@ngrx/store';
import { Task, Priority, Status } from '../../core/models/task.model';

export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: any[] }>()
);

export const moveTask = createAction(
  '[Tasks] Move Task',
  props<{ previousIndex: number; currentIndex: number; list: Status }>()
);

export const transferTask = createAction(
  '[Tasks] Transfer Task',
  props<{
    previousIndex: number;
    currentIndex: number;
    previousList: Status;
    currentList: Status;
  }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ taskId: string }>()
);

export const setSearchQuery = createAction(
  '[Tasks] Set Search Query',
  props<{ query: string }>()
);

export const setFilterCriteria = createAction(
  '[Tasks] Set Filter Criteria',
  props<{ criteria: { priority?: Priority; assignedTo?: string } }>()
);
