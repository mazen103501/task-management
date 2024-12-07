import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<State>('tasks');

export const selectPendingTasks = createSelector(
  selectTasksState,
  (state) => state.pending
);

export const selectInProgressTasks = createSelector(
  selectTasksState,
  (state) => state.inProgress
);

export const selectCompletedTasks = createSelector(
  selectTasksState,
  (state) => state.completed
);

export const selectTaskById = (taskId: string) =>
  createSelector(selectTasksState, (state) =>
    [...state.pending, ...state.inProgress, ...state.completed].find(
      (task) => task.id === taskId
    )
  );
