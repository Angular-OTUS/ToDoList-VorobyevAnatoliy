import {Component, computed, OnInit, signal} from '@angular/core';
import {Task} from '../../interfaces/task';
import {FormsModule} from '@angular/forms';
import {getNextTaskId, getTasks} from '../../services/storage';
import {ToDoListItem} from '../to-do-list-item/to-do-list-item';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.html',
  standalone: true,
  imports: [
    FormsModule,
    ToDoListItem,
    MatInput,
    MatFormField,
    MatLabel,
    MatIconButton,
  ],
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {

  tasks: Task[] = []

  newTaskTextInput = signal('')

  newTaskTextIsEmpty = computed(() => !this.newTaskTextInput().trim())

  ngOnInit(): void {
    this.tasks = getTasks()
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId)
  }

  addNewTask(taskText: string) {
    this.tasks.push({id: getNextTaskId(), text: taskText})
    this.newTaskTextInput.set('')
  }
}
