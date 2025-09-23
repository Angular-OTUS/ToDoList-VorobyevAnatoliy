import {Task} from '../interfaces/task';

let tasks: Task[] = [
  {id: 1, text: "Visit a market"},
  {id: 2, text: "Wash the dishes"},
  {id: 3, text: "Choose a gift"},
]

export function getTasks(): Task[] {
  return tasks
}

export function getNextTaskId(): number {
  if (tasks.length === 0) {
    return 1;
  }
  return Math.max(...tasks.map(t => t.id)) + 1;
}
