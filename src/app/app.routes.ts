import {Routes} from '@angular/router';

export const ROUTES = {
  MAIN: '',
  TASKS_LIST: 'tasks',
  TASK_ID: ':id',
} as const;

export const routes: Routes = [
  {
    path: ROUTES.MAIN,
    redirectTo: ROUTES.TASKS_LIST,
    pathMatch: "full",
  },
  {
    path: ROUTES.TASKS_LIST,
    loadComponent: () => import('./pages/tasks/tasks').then(c => c.Tasks),
    title: 'Todo List',
    children: [
      {
        path: ROUTES.TASK_ID,
        loadComponent: () => import('./components/to-do-item-view/to-do-item-view').then(c => c.ToDoItemView),
      },
    ],
  },
  {
    path: ROUTES.TASK_ID,
    loadComponent: () => import('./pages/tasks/tasks').then(c => c.Tasks),
    title: 'Todo List',
  },
  {
    path: '**',
    redirectTo: ROUTES.TASKS_LIST,
  },
];
