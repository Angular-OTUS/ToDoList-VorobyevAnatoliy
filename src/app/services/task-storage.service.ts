import {inject, Injectable} from '@angular/core';
import {Task} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {

  url = 'http://localhost:3000/tasks'

  private http = inject(HttpClient)

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url)
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task)
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}
