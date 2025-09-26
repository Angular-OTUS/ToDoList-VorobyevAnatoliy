import {Component, computed, OnInit, signal} from '@angular/core';
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
    Button,
  ],
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit {

  private defaultTaskId: number = -1;

  readonly tasks = signal<Task[]>([])

  readonly isLoading = signal(false)

  readonly newTaskTitle = signal('')

  readonly newTaskTitleIsEmpty = computed(() => !this.newTaskTitle().trim())

  readonly newTaskDescription = signal('')

  readonly selectedItemId = signal(this.defaultTaskId)

  readonly selectedTaskDescription = computed(() => this.getSelectedTaskDescription(this.selectedItemId()))

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(): void {
    this.isLoading.set(true)
    setTimeout(() => {
      this.tasks.set(getTasks())
      this.isLoading.set(false)
    }, 500)
  }

  selectTask(taskId: number): void {
    this.selectedItemId.set(taskId)
  }

  getSelectedTask(taskId: number): Task | undefined {
    return this.tasks().find(task => task.id === taskId)
  }

  getSelectedTaskDescription(taskId: number): string {
    const selectedTask = this.getSelectedTask(taskId);
    if (!selectedTask) {
      return ''
    }
    return selectedTask.description
  }

  deleteTask(taskId: number): void {
    this.tasks.update((taskList) => taskList.filter(task => task.id !== taskId))
  }

  addNewTask(taskTitle: string, taskDescription: string): void {
    this.tasks.update((taskList) => [...taskList, {
      id: getNextId(taskList),
      text: taskTitle,
      description: taskDescription,
    }])
    this.newTaskTitle.set('')
    this.newTaskDescription.set('')
    this.selectedItemId.set(this.defaultTaskId)
  }
}
