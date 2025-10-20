import {Routes} from '@angular/router';

export const ROUTE_CONFIG = {
  MAIN: '',
  TASKS_LIST: 'tasks',
  TASK_ID: ':id',
} as const;

export const routes: Routes = [
  {
    path: ROUTE_CONFIG.MAIN,
    redirectTo: ROUTE_CONFIG.TASKS_LIST,
    pathMatch: "full",
  },
  {
    path: ROUTE_CONFIG.TASKS_LIST,
    loadComponent: () => import('./pages/tasks/tasks').then(c => c.Tasks),
    title: 'Todo List',
    children: [
      {
        path: ROUTE_CONFIG.TASK_ID,
        loadComponent: () => import('./components/to-do-item-view/to-do-item-view').then(c => c.ToDoItemView),
      },
    ],
  },
  {
    path: ROUTE_CONFIG.TASK_ID,
    loadComponent: () => import('./pages/tasks/tasks').then(c => c.Tasks),
    title: 'Todo List',
  },
  {
    path: '**',
    redirectTo: ROUTE_CONFIG.TASKS_LIST,
  },
];
