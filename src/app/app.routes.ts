import {Routes} from '@angular/router';
import {ROUTE_PARAMS, ROUTE_PATHS} from './const';
import {taskExistsGuard} from './guards/task-exists-guard';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.MAIN,
    redirectTo: ROUTE_PATHS.TASKS,
    pathMatch: "full",
  },
  {
    path: ROUTE_PATHS.TASKS,
    loadComponent: () => import('./pages/tasks/tasks').then(c => c.Tasks),
    title: 'Todo List',
    canActivateChild: [taskExistsGuard],
    children: [
      {
        path: ':' + ROUTE_PARAMS.TASK_ID,
        loadComponent: () => import('./components/to-do-item-view/to-do-item-view').then(c => c.ToDoItemView),
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTE_PATHS.TASKS,
  },
];
