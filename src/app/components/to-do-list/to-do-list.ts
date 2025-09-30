import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Task} from '../../models/task';
import {FormsModule} from '@angular/forms';
import {ToDoListItem} from '../to-do-list-item/to-do-list-item';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Button} from '../button/button';
import {getNextId} from '../../helpers/generator-id';
import {TooltipDirective} from '../../directives/tooltip';
import {TaskStorageService} from '../../services/task-storage.service';
import {ToastService} from '../../services/toast.service';
import {Toasts} from '../toasts/toasts';

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
    TooltipDirective,
    Toasts,
  ],
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit {

  private defaultTaskId = -1;

  readonly tasks = signal<Task[]>([])

  readonly isLoading = signal(false)

  readonly newTaskTitle = signal('')

  readonly newTaskTitleIsEmpty = computed(() => !this.newTaskTitle().trim())

  readonly newTaskDescription = signal('')

  readonly selectedItemId = signal(this.defaultTaskId)

  readonly selectedTaskDescription = computed(() => this.tasks().find(t => t.id === this.selectedItemId())?.description)

  private storageService = inject(TaskStorageService);

  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(): void {
    this.isLoading.set(true)
    setTimeout(() => {
      this.storageService.getTasks().subscribe({
        next: (tasks: Task[]) => this.tasks.set(tasks),
        error: (error: Error) => this.toastService.showError(`Tasks can't be loaded. Probably should run app with 'npm start' instead of 'ng serve'.\n${error.message}`),
      })
      this.isLoading.set(false)
    }, 500)
  }

  onSelectTask(taskId: number): void {
    this.selectedItemId.set(taskId)
  }

  onDeleteTask(taskId: number, taskText: string): void {
    this.storageService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update((tasks) => tasks.filter(t => t.id !== taskId))
        this.toastService.showWarning(`Task '${taskText}' is deleted!`)
      },
      error: (error: Error) => this.toastService.showError(error.message),
    })
  }

  onAddTask(taskText: string, taskDescription: string): void {
    const newTask: Task = {
      id: getNextId(this.tasks()),
      text: taskText,
      description: taskDescription,
    }
    this.storageService.addTask(newTask).subscribe({
      next: (task: Task) => {
        this.toastService.showSuccess(`Task '${task.text}' is successfully added`)
        this.tasks.update((taskList) => [...taskList, task])
        this.newTaskTitle.set('')
        this.newTaskDescription.set('')
        this.selectedItemId.set(this.defaultTaskId)
      },
      error: (error: Error) => this.toastService.showError(error.message),
    })
  }
}
