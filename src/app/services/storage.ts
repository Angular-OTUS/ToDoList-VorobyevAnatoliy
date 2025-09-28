import {Task} from '../models/task';

const tasks: Task[] = [
  {id: 1, text: "Visit a market", description: "Buy milk and cat's food"},
  {id: 2, text: "Wash the dishes", description: "Come on!"},
  {id: 3, text: "Choose a gift", description: "Mom's birthday soon"},
]

export function getTasks(): Task[] {
  return tasks
}
