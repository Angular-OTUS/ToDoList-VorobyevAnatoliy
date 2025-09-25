import {Task} from '../models/task';

const tasks: Task[] = [
  {id: 1, text: "Visit a market"},
  {id: 2, text: "Wash the dishes"},
  {id: 3, text: "Choose a gift"},
]

export function getTasks(): Task[] {
  return tasks
}
