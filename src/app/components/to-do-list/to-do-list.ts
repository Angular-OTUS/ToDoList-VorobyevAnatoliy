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
      this.storageService.getTasks().subscribe(tasks => this.tasks.set(tasks))
      this.isLoading.set(false)
    }, 500)
  }

  onSelectTask(taskId: number): void {
    this.selectedItemId.set(taskId)
  }

  onDeleteTask(taskId: number, taskText: string): void {
    this.tasks.update((taskList) => taskList.filter(task => task.id !== taskId))
    this.toastService.showWarning(`Task '${taskText}' is deleted!`)
  }

  onAddTask(taskText: string, taskDescription: string): void {
    this.tasks.update((taskList) => [...taskList, {
      id: getNextId(taskList),
      text: taskText,
      description: taskDescription,
    }])
    this.toastService.showSuccess(`Task '${taskText}' is successfully added`)
    this.newTaskTitle.set('')
    this.newTaskDescription.set('')
    this.selectedItemId.set(this.defaultTaskId)
  }
}
