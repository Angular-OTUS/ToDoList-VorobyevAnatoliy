import {Component, computed, inject, input} from '@angular/core';
import {Status, TaskStatus} from '../../models/task';
import {TaskStorageService} from '../../services/task-storage.service';
import {ToastService} from '../../services/toast.service';
import {ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree} from '@angular/router';

export const taskExistsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
): boolean | UrlTree => {
  const storageService = inject(TaskStorageService)
  const router = inject(Router)
  const taskId: string = route.params['id']
  if (taskId && storageService.isTaskExist(taskId)) {
    return true
  }
  return router.parseUrl('/tasks')
}

@Component({
  selector: 'app-to-do-item-view',
  templateUrl: './to-do-item-view.html',
  standalone: true,
  styleUrl: './to-do-item-view.css',
})
export class ToDoItemView {

  storageService = inject(TaskStorageService)

  toastService = inject(ToastService)

  id = input.required<number>()

  task = computed(() => this.storageService.tasks().find(t => t.id === this.id()))

  isCompleted = computed(() => this.task()?.status == TaskStatus.Completed);

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
