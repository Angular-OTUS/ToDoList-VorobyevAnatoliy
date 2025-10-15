import {Component, computed, inject, input, model} from '@angular/core';
import {Status, Task, TaskStatus} from '../../models/task';
import {TaskStorageService} from '../../services/task-storage.service';
import {ToastService} from '../../services/toast.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-to-do-item-view',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './to-do-item-view.html',
  standalone: true,
  styleUrl: './to-do-item-view.css',
})
export class ToDoItemView {

  id = input.required<number>()

  task = model<Task>()

  isCompleted = computed(() => this.task()?.status == TaskStatus.Completed);

  storageService = inject(TaskStorageService)

  toastService = inject(ToastService)

  protected onStatusChange(evt: Event): void {
    if (!this.task()) {
      return
    }
    const checkbox = evt.target as HTMLInputElement
    const status: Status = checkbox.checked ? TaskStatus.Completed : TaskStatus.InProgress
    this.storageService.updateTask(this.task()!.id, {status})
      .subscribe({
        next: () => this.toastService.showSuccess(`Status is updated for task '${this.task()!.text}'`),
        error: (error: Error) => this.toastService.showError(error.message),
      })
  }
}
