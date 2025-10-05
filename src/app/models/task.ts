export const enum TaskStatus {
  NotSet = 0,
  InProgress= 1,
  Completed = 2,
}

export const TaskStatuses: TaskStatus[] = [
  TaskStatus.NotSet,
  TaskStatus.InProgress,
  TaskStatus.Completed,
]

export interface TaskData {
  text: string;
  description: string;
  status: TaskStatus;
}

export interface Task extends TaskData {
  id: number;
}
