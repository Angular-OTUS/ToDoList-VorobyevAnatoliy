import {ActivatedRouteSnapshot, CanActivateChildFn, Router, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {inject} from '@angular/core';
import {TaskStorageService} from '../services/task-storage.service';
import {ROUTE_PARAMS, ROUTE_PATHS} from '../const';

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

function checkTaskExists(taskService: TaskStorageService, router: Router, taskId: string) {
  const exists = taskService.isTaskExist(taskId);
  if (exists) {
    return of(true);
  }
  return router.navigate([`/${ROUTE_PATHS.TASKS}`]);
}
