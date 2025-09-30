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
}
