import {Component, OnInit} from '@angular/core';
import {getTasks, Task} from '../../interfaces/task';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {

  tasks: Task[] = []

  newTaskText: string = ""

  ngOnInit(): void {
    this.tasks = getTasks()
  }
}
