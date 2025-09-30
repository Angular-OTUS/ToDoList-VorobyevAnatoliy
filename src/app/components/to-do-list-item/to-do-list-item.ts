import {Component, inject, model, output, signal} from '@angular/core';
import {Task} from '../../models/task';
import {Button} from '../button/button';
import {TooltipDirective} from '../../directives/tooltip';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../services/toast.service';
import {TaskStorageService} from '../../services/task-storage.service';

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

  private storageService = inject(TaskStorageService);

  readonly toastService = inject(ToastService);

  onDeleteTask(): void {
    this.deleteMe.emit()
  }

  onSaveTask(taskText: string): void {
    const updatedTask: Task = { ...this.task(), text: taskText }
    this.storageService.updateTask(updatedTask).subscribe({
      next: (task: Task) => {
        this.task.set(task)
        this.editMode.set(false)
        this.toastService.showSuccess(`Task '${this.task().text}' is updated to '${taskText}'`)
      },
      error: (error: Error) => this.toastService.showError(error.message),
    })
  }

  onDoubleClick() {
    this.editMode.set(true)
    this.toastService.showInfo(`Task '${this.task().text}' is in editing mode`)
  }
}
