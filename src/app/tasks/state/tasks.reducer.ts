import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Priority,
  Status,
  Task,
  TaskHistory,
} from '../../core/models/task.model';

export interface State {
  pending: Task[];
  inProgress: Task[];
  completed: Task[];
  searchQuery: string;
  filterCriteria: {
    priority?: Priority;
    assignedTo?: string;
  };
}

export const initialState: State = {
  pending: [
    {
      id: '1',
      taskName: 'Design Database Schema',
      description: 'Create the initial database schema for the project',
      priority: Priority.High,
      status: Status.Pending,
      assignedTo: 'John Doe',
      dueDate: '2024-12-01',
      history: [],
    },
    {
      id: '2',
      taskName: 'Setup CI/CD Pipeline',
      description: 'Setup continuous integration and deployment pipeline',
      priority: Priority.Medium,
      status: Status.Pending,
      assignedTo: 'Jane Smith',
      dueDate: '2024-12-05',
      history: [],
    },
  ],
  inProgress: [
    {
      id: '3',
      taskName: 'Implement Authentication',
      description: 'Add JWT authentication system',
      priority: Priority.High,
      status: Status.InProgress,
      assignedTo: 'Mike Johnson',
      dueDate: '2024-12-10',
      history: [],
    },
    {
      id: '4',
      taskName: 'Write API Documentation',
      description: 'Document all API endpoints',
      priority: Priority.Medium,
      status: Status.InProgress,
      assignedTo: 'Sarah Wilson',
      dueDate: '2024-12-12',
      history: [],
    },
  ],
  completed: [
    {
      id: '5',
      taskName: 'Project Setup',
      description: 'Initialize project and install dependencies',
      priority: Priority.High,
      status: Status.Completed,
      assignedTo: 'Tom Brown',
      dueDate: '2024-12-05',
      history: [],
    },
    {
      id: '6',
      taskName: 'Requirements Analysis',
      description: 'Analyze and document project requirements',
      priority: Priority.Medium,
      status: Status.Completed,
      assignedTo: 'Mike Johnson',
      dueDate: '2024-12-08',
      history: [],
    },
  ],
  searchQuery: '',
  filterCriteria: {},
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    ...tasks,
  })),
  on(TasksActions.moveTask, (state, { previousIndex, currentIndex, list }) => {
    const updatedList = [...state[list]];
    moveItemInArray(updatedList, previousIndex, currentIndex);
    return { ...state, [list]: updatedList };
  }),
  on(
    TasksActions.transferTask,
    (state, { previousIndex, currentIndex, previousList, currentList }) => {
      const previousArray = [...state[previousList]];
      const currentArray = [...state[currentList]];
      const movedTask = previousArray.splice(previousIndex, 1)[0];

      const updatedTask: Task = {
        ...movedTask,
        status: currentList,
      };
      currentArray.splice(currentIndex, 0, updatedTask);

      return {
        ...state,
        [previousList]: previousArray,
        [currentList]: currentArray,
      };
    }
  ),
  on(TasksActions.addTask, (state, { task }) => {
    const updatedList = [...state[task.status], task];
    return { ...state, [task.status]: updatedList };
  }),
  on(TasksActions.updateTask, (state, { task }) => {
    const removeTaskFromList = (tasks: Task[], taskId: string) =>
      tasks.filter((t) => t.id !== taskId);

    const addTaskToList = (tasks: Task[], task: Task) => [...tasks, task];

    const updatedState = {
      pending: removeTaskFromList(state.pending, task.id),
      inProgress: removeTaskFromList(state.inProgress, task.id),
      completed: removeTaskFromList(state.completed, task.id),
    };

    updatedState[task.status] = addTaskToList(updatedState[task.status], task);

    return { ...state, ...updatedState };
  }),
  on(TasksActions.deleteTask, (state, { taskId }) => {
    const deleteTaskFromList = (tasks: Task[]) =>
      tasks.filter((t) => t.id !== taskId);

    return {
      ...state,
      pending: deleteTaskFromList(state.pending),
      inProgress: deleteTaskFromList(state.inProgress),
      completed: deleteTaskFromList(state.completed),
    };
  }),
  on(TasksActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),
  on(TasksActions.setFilterCriteria, (state, { criteria }) => ({
    ...state,
    filterCriteria: criteria,
  }))
);
