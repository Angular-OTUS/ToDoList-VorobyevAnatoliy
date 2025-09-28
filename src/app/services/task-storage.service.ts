import { Injectable } from '@angular/core';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {

  private tasks: Task[] = [
    {id: 1, text: "Visit a market", description: "Buy milk and cat's food"},
    {id: 2, text: "Wash the dishes", description: "Come on!"},
    {id: 3, text: "Choose a gift", description: "Mom's birthday soon"},
  ]

  getTasks(): Task[] {
    return this.tasks
  }
}
