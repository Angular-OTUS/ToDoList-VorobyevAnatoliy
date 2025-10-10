import {DestroyRef, inject, Injectable} from '@angular/core';
import {Task, TaskData} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {

  private URL_TASKS = 'http://localhost:3000/tasks'

  private http = inject(HttpClient)

  private destroy$ = inject(DestroyRef)

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.URL_TASKS).pipe(
      takeUntilDestroyed(this.destroy$),
    )
  }

  public addTask(task: TaskData): Observable<Task> {
    return this.http.post<Task>(this.URL_TASKS, task).pipe(
      takeUntilDestroyed(this.destroy$),
    )
  }

  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_TASKS}/${id}`).pipe(
      takeUntilDestroyed(this.destroy$),
    )
  }

  public updateTask(taskId: number, updatedData: Partial<TaskData>): Observable<Task> {
    return this.http.patch<Task>(`${this.URL_TASKS}/${taskId}`, updatedData).pipe(
      takeUntilDestroyed(this.destroy$),
    )
  }
}
