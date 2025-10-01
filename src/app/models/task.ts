export const enum TaskStatus {
  InProgress = 0,
  Completed = 1,
}

export interface TaskData {
  text: string;
  description: string;
  status: TaskStatus;
}

export interface Task extends TaskData {
  id: number;
}
