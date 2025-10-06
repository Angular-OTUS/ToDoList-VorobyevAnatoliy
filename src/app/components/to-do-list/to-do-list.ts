import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Status, Task, TaskData, TaskStatus} from '../../models/task';
import {FormsModule} from '@angular/forms';
import {ToDoListItem} from '../to-do-list-item/to-do-list-item';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Button} from '../button/button';
import {TooltipDirective} from '../../directives/tooltip';
import {TaskStorageService} from '../../services/task-storage.service';
import {ToastService} from '../../services/toast.service';
import {Toasts} from '../toasts/toasts';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {ToDoStatusSelector} from '../to-do-status-selector/to-do-status-selector';

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
    LoadingSpinner,
    ToDoStatusSelector,
  ],
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit {

  private DEFAULT_TASK_ID = -1;

  protected readonly tasks = signal<Task[]>([])

  protected readonly filterStatus = signal<Status>(TaskStatus.NotSet)

  protected readonly filteredTasks = computed(() => this.tasks().filter((task) => this.filterStatus() == TaskStatus.NotSet || task.status === this.filterStatus()));

  protected readonly isLoading = signal(false)

  protected readonly newTaskTitle = signal('')

  protected readonly newTaskTitleIsEmpty = computed(() => !this.newTaskTitle().trim())

  protected readonly newTaskDescription = signal('')

  protected readonly selectedTaskId = signal(this.DEFAULT_TASK_ID)

  protected readonly selectedTaskDescription = computed(() => this.tasks().find(t => t.id === this.selectedTaskId())?.description)

  private storageService = inject(TaskStorageService);

  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.loadTasks()
  }

  private loadTasks(): void {
    this.isLoading.set(true)
    setTimeout(() => {
      this.storageService.getTasks().subscribe({
        next: (tasks: Task[]) => {
          this.tasks.set(tasks)
          this.toastService.showSuccess(`${this.tasks().length} tasks successfully loaded`)
        },
        error: (error: Error) => this.toastService.showError(`Tasks can't be loaded. Probably should run app with 'npm start' instead of 'ng serve'.\n${error.message}`),
      })
      this.isLoading.set(false)
    }, 500)
  }

  protected onChangeTaskStatus(task: Task): void {
    this.tasks.update(tasks => tasks.map(t => t.id === task.id ? task : t))
  }

  protected onSelectTask(taskId: number): void {
    this.selectedTaskId.set(taskId)
  }

  protected onDeleteTask(taskId: number, taskText: string): void {
    this.storageService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update((tasks) => tasks.filter(t => t.id !== taskId))
        this.toastService.showWarning(`Task '${taskText}' is deleted!`)
      },
      error: (error: Error) => this.toastService.showError(error.message),
    })
  }

  protected onAddTask(taskText: string, taskDescription: string): void {
    const newTaskData: TaskData = {
      text: taskText,
      description: taskDescription,
      status: TaskStatus.InProgress,
    }
    this.storageService.addTask(newTaskData).subscribe({
      next: (task: Task) => {
        this.toastService.showSuccess(`Task '${task.text}' is successfully added`)
        this.tasks.update((taskList) => [...taskList, task])
        this.newTaskTitle.set('')
        this.newTaskDescription.set('')
        this.selectedTaskId.set(this.DEFAULT_TASK_ID)
      },
      error: (error: Error) => this.toastService.showError(error.message),
    })
  }
}
