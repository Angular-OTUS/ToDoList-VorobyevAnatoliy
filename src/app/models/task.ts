export const TaskStatus = {
  NotSet: 0,
  InProgress: 1,
  Completed: 2,
} as const

export type Status = typeof TaskStatus[keyof typeof TaskStatus];

export interface TaskData {
  text: string;
  description: string;
  status: Status;
}

export interface Task extends TaskData {
  id: number;
}
