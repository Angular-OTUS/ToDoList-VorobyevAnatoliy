import {Component, OnInit} from '@angular/core';
import {getTasks, Task} from '../../interfaces/task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.html',
  standalone: true,
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {

  tasks: Task[] | undefined

  ngOnInit(): void {
    this.tasks = getTasks()
  }
}
