import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../interfaces/task';

@Component({
  selector: 'app-to-do-list-item',
  imports: [],
  templateUrl: './to-do-list-item.html',
  standalone: true,
  styleUrl: './to-do-list-item.css'
})
export class ToDoListItem {

  @Input({required: true})
  task!: Task;

  @Output()
  deletedTask: EventEmitter<number> = new EventEmitter();

  deleteTask() {
    this.deletedTask.emit(this.task.id)
  }
}
