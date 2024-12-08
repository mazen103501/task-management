import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './tasks.reducer';
import { Task } from '../../core/models/task.model';

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

export const selectSearchQuery = createSelector(
  selectTasksState,
  (state) => state.searchQuery
);

export const selectFilterCriteria = createSelector(
  selectTasksState,
  (state) => state.filterCriteria
);

const filterTasks = (
  tasks: Task[],
  searchQuery: string,
  filterCriteria: any
) => {
  return tasks.filter((task) => {
    const matchesSearchQuery = task.taskName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPriority = filterCriteria.priority
      ? task.priority === filterCriteria.priority
      : true;

    const matchesAssignedTo = filterCriteria.assignedTo
      ? task.assignedTo === filterCriteria.assignedTo
      : true;

    return matchesSearchQuery && matchesPriority && matchesAssignedTo;
  });
};

export const selectFilteredPendingTasks = createSelector(
  selectTasksState,
  selectSearchQuery,
  selectFilterCriteria,
  (state, searchQuery, filterCriteria) =>
    filterTasks(state.pending, searchQuery, filterCriteria)
);

export const selectFilteredInProgressTasks = createSelector(
  selectTasksState,
  selectSearchQuery,
  selectFilterCriteria,
  (state, searchQuery, filterCriteria) =>
    filterTasks(state.inProgress, searchQuery, filterCriteria)
);

export const selectFilteredCompletedTasks = createSelector(
  selectTasksState,
  selectSearchQuery,
  selectFilterCriteria,
  (state, searchQuery, filterCriteria) =>
    filterTasks(state.completed, searchQuery, filterCriteria)
);
