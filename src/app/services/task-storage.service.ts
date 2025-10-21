import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Task, TaskData} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {

  private URL_TASKS = 'http://localhost:3000/tasks'

  private http = inject(HttpClient)

  private destroy$ = inject(DestroyRef)

  readonly tasks = signal<Task[]>([])

  public isTaskExist(taskId: string): Observable<boolean> {
    console.log('call isTaskExist with taskId', taskId);
    return toObservable(this.tasks).pipe(
      map(tasks => tasks.some(t => t.id.toString() === taskId)),
      tap(() => console.log('tasks:', this.tasks())),
      tap((result) => console.log('result', result)),
      takeUntilDestroyed(this.destroy$),
    )
  }

  public fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.URL_TASKS).pipe(
      tap((tasks: Task[]) => this.tasks.set(tasks)),
      takeUntilDestroyed(this.destroy$),
    )
  }

  public addTask(task: TaskData): Observable<Task> {
    return this.http.post<Task>(this.URL_TASKS, task).pipe(
      tap((task: Task) => this.tasks.update((tasks: Task[]) => [...tasks, task])),
      takeUntilDestroyed(this.destroy$),
    )
  }

  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_TASKS}/${id}`).pipe(
      tap(() => this.tasks.update((tasks: Task[]) => tasks.filter(t => t.id !== id))),
      takeUntilDestroyed(this.destroy$),
    )
  }

  public updateTask(taskId: number, updatedData: Partial<TaskData>): Observable<Task> {
    return this.http.patch<Task>(`${this.URL_TASKS}/${taskId}`, updatedData).pipe(
      tap((task: Task) => this.tasks.update((tasks: Task[]) => tasks.map(t => t.id === taskId ? task : t))),
      takeUntilDestroyed(this.destroy$),
    )
  }
}
