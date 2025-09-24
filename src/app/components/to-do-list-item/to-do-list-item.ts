import {Component, input, model} from '@angular/core';
import {Task} from '../../interfaces/task';
import {Button} from '../button/button';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    Button,
  ],
  templateUrl: './to-do-list-item.html',
  standalone: true,
  styleUrl: './to-do-list-item.css',
})
export class ToDoListItem {

  task = input.required<Task>();

  deletedTaskId = model(0);

  deleteTask() {
    this.deletedTaskId.set(this.task().id)
  }
}
