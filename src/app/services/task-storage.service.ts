import {inject, Injectable} from '@angular/core';
import {Task, TaskData} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {

  private URL_TASKS = 'http://localhost:3000/tasks'

  private http = inject(HttpClient)

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.URL_TASKS)
  }

  public addTask(task: TaskData): Observable<Task> {
    return this.http.post<Task>(this.URL_TASKS, task)
  }

  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_TASKS}/${id}`)
  }

  public updateTask(taskId: number, updatedData: Partial<TaskData>): Observable<Task> {
    return this.http.put<Task>(`${this.URL_TASKS}/${taskId}`, updatedData)
  }
}
