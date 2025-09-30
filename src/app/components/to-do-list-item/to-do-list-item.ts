import {Component, inject, model, output, signal} from '@angular/core';
import {Task} from '../../models/task';
import {Button} from '../button/button';
import {TooltipDirective} from '../../directives/tooltip';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../services/toast.service';

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

  readonly toastService = inject(ToastService);

  onDeleteTask(): void {
    this.deleteMe.emit()
  }

  onSaveTask(taskText: string): void {
    this.task.update((t) => {
      return {...t, text: taskText};
    })
    this.toastService.showSuccess(`Task '${this.task().text}' is updated to '${taskText}'`)
    this.editMode.set(false)
  }

  onDoubleClick() {
    this.toastService.showInfo(`Task '${this.task().text}' is in editing mode`)
    this.editMode.set(true)
  }
}
