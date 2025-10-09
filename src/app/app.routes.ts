import {Routes} from '@angular/router';

export const ROUTES = {
  MAIN: '',
  TASKS: 'tasks',
} as const;

export const routes: Routes = [
  {
    path: ROUTES.MAIN,
    redirectTo: ROUTES.TASKS,
    pathMatch: "full",
  },
  {
    path: ROUTES.TASKS,
    loadComponent: () => import('./pages/tasks/tasks').then(c => c.Tasks),
    title: 'Todo List',
  },
  {
    path: '**',
    redirectTo: ROUTES.TASKS,
  },
];
