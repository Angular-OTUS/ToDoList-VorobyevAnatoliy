import {Component, computed, OnInit, signal} from '@angular/core';
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

  newTaskText = signal('')

  newTaskTextIsEmpty = computed(() => !this.newTaskText().trim())

  ngOnInit(): void {
    this.tasks = getTasks()
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}
