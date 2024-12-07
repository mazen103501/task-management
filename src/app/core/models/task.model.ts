export interface Task {
  id: string;
  taskName: string;
  description: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
  dueDate: Date | string;
  history: TaskHistory[];
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum Status {
  Pending = 'pending',
  InProgress = 'inProgress',
  Completed = 'completed',
}

export interface TaskHistory {
  date: Date;
  changes: string;
}
