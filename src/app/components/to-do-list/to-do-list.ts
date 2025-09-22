import {Component, computed, OnInit, signal} from '@angular/core';
import {Task} from '../../interfaces/task';
import {FormsModule} from '@angular/forms';
import {getNextTaskId, getTasks} from '../../services/storage';
import {ToDoListItem} from '../to-do-list-item/to-do-list-item';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.html',
  standalone: true,
  imports: [
    FormsModule,
    ToDoListItem
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

  addNewTask(taskText: string) {
    const nextId = getNextTaskId();
    this.tasks.push({id: nextId, text: taskText})
    this.newTaskText.set('')
  }
}
