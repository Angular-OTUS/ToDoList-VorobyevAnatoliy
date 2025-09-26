import {Component, input, output} from '@angular/core';
import {Task} from '../../models/task';
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

  readonly task = input.required<Task>();

  readonly selectedTaskId = output<number>()

  readonly deletedTaskId = output<number>();

  selectTask(): void {
    this.selectedTaskId.emit(this.task().id)
  }

  deleteTask(): void {
    this.deletedTaskId.emit(this.task().id)
  }
}
