import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Priority, Status, Task } from '../../core/models/task.model';

export interface State {
  pending: Task[];
  inProgress: Task[];
  completed: Task[];
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
    },
    {
      id: '2',
      taskName: 'Setup CI/CD Pipeline',
      description: 'Setup continuous integration and deployment pipeline',
      priority: Priority.Medium,
      status: Status.Pending,
      assignedTo: 'Jane Smith',
      dueDate: '2024-12-05',
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
    },
    {
      id: '4',
      taskName: 'Write API Documentation',
      description: 'Document all API endpoints',
      priority: Priority.Medium,
      status: Status.InProgress,
      assignedTo: 'Sarah Wilson',
      dueDate: '2024-12-12',
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
    },
    {
      id: '6',
      taskName: 'Requirements Analysis',
      description: 'Analyze and document project requirements',
      priority: Priority.Medium,
      status: Status.Completed,
      assignedTo: 'Mike Johnson',
      dueDate: '2024-12-08',
    },
  ],
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
    const updateTaskList = (tasks: Task[]) =>
      tasks.map((t) => (t.id === task.id ? task : t));

    return {
      ...state,
      pending: updateTaskList(state.pending),
      inProgress: updateTaskList(state.inProgress),
      completed: updateTaskList(state.completed),
    };
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
  })
);
