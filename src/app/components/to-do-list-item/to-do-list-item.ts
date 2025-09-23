import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Input({required: true})
  task!: Task;

  @Output()
  deleteTaskEmitter = new EventEmitter<number>();

  deleteTask() {
    this.deleteTaskEmitter.emit(this.task.id)
  }
}
