import {Component, computed, inject, model, output, signal} from '@angular/core';
import {Status, Task, TaskStatus} from '../../models/task';
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

  public readonly task = model.required<Task>();

  protected readonly deleteMe = output<void>();

  protected readonly editMode = signal(false)

  protected readonly isCompleted = computed(() => this.task().status == TaskStatus.Completed);

  protected readonly isStatusChanged = output<Task>()

  private readonly storageService = inject(TaskStorageService);

  private readonly toastService = inject(ToastService);

  protected onDeleteTask(): void {
    this.deleteMe.emit()
  }

  protected onSaveTask(text: string): void {
    this.storageService.updateTask(this.task().id, {text}).subscribe({
      next: (task: Task) => {
        this.task.set(task)
        this.editMode.set(false)
        this.toastService.showSuccess(`Task '${this.task().text}' is updated to '${text}'`)
      },
      error: (error: Error) => this.toastService.showError(error.message),
    })
  }

  protected onDoubleClick() {
    this.editMode.set(true)
    this.toastService.showInfo(`Task '${this.task().text}' is in editing mode`)
  }

  protected onStatusChange(evt: Event): void {
    const checkbox = evt.target as HTMLInputElement
    const status: Status = checkbox.checked ? TaskStatus.Completed : TaskStatus.InProgress
    this.storageService.updateTask(this.task().id, {status}).subscribe({
      next: (task: Task) => {
        this.task.set(task)
        this.isStatusChanged.emit(task)
        this.toastService.showSuccess(`Status is updated for task '${this.task().text}'`)
      },
      error: (error: Error) => this.toastService.showError(error.message),
    })
  }
}
