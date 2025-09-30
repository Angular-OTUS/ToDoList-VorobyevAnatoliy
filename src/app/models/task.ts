export interface TaskData {
  text: string;
  description: string;
}

export interface Task extends TaskData {
  id: number;
}
