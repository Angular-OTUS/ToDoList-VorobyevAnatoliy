import {Component, computed, inject, input} from '@angular/core';
import {Status, TaskStatus} from '../../models/task';
import {TaskStorageService} from '../../services/task-storage.service';
import {ToastService} from '../../services/toast.service';
import {ActivatedRouteSnapshot, CanActivateChildFn, Router, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';

import {ROUTE_PARAMS, ROUTE_PATHS} from '../../const';

function checkTaskExists(taskService: TaskStorageService, router: Router, taskId: string) {
  const exists = taskService.isTaskExist(taskId);
  if (exists) {
    return of(true);
  }
  return router.navigate([`/${ROUTE_PATHS.TASKS}`]);
}

export const taskExistsGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
): Observable<boolean> | Promise<boolean> | UrlTree => {
  const storageService = inject(TaskStorageService)
  const router = inject(Router)
  const taskId: string = route.params[ROUTE_PARAMS.TASK_ID]

  if (storageService.tasks().length) {
    return checkTaskExists(storageService, router, taskId);
  }
  return storageService.fetchTasks().pipe(
    switchMap(() => checkTaskExists(storageService, router, taskId)),
  )
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
