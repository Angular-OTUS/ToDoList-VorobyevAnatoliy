import {Component, model, output, signal} from '@angular/core';
import {Task} from '../../models/task';
import {Button} from '../button/button';
import {TooltipDirective} from '../../directives/tooltip';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    Button,
    TooltipDirective,
    FormsModule,
  ],
  templateUrl: './to-do-list-item.html',
  standalone: true,
  styleUrl: './to-do-list-item.css',
})
export class ToDoListItem {

  readonly task = model.required<Task>();

  readonly deleteMe = output<void>();

  readonly editMode = signal(false)

  onDeleteTask(): void {
    this.deleteMe.emit()
  }

  onSaveTask(taskText: string): void {
    this.task.update((t) => {
      return {...t, text: taskText};
    })
    this.editMode.set(false)
  }
}
