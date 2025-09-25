import {Component, computed, effect, OnDestroy, OnInit, signal} from '@angular/core';
import {Task} from '../../models/task';
import {FormsModule} from '@angular/forms';
import {getTasks} from '../../services/storage';
import {ToDoListItem} from '../to-do-list-item/to-do-list-item';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Button} from '../button/button';
import {getNextId} from '../../helpers/generator-id';

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
    MatProgressSpinner,
    Button
  ],
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit, OnDestroy {

  readonly tasks = signal<Task[]>([])

  readonly newTaskTextInput = signal('')

  readonly newTaskTextIsEmpty = computed(() => !this.newTaskTextInput().trim())

  readonly isLoading = signal(false)

  readonly deletedTaskId = signal(0)

  readonly deleteTaskEffect = effect(() => this.deleteTask(this.deletedTaskId()))

  ngOnInit(): void {
    this.loadTasks()
  }

  ngOnDestroy(): void {
    this.deleteTaskEffect.destroy()
  }

  loadTasks(): void {
    this.isLoading.set(true)
    setTimeout(() => {
      this.tasks.set(getTasks())
      this.isLoading.set(false)
    }, 500)
  }

  deleteTask(taskId: number) {
    this.tasks.update((taskList) => taskList.filter(task => task.id !== taskId))
  }

  addNewTask(taskText: string) {
    this.tasks.update((taskList) => [...taskList, {id: getNextId(taskList), text: taskText}])
    this.newTaskTextInput.set('')
  }
}
