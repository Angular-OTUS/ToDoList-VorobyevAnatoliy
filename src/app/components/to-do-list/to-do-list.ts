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
import {TooltipDirective} from '../../directives/tooltip';

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

  onSelectTask(taskId: number): void {
    this.selectedItemId.set(taskId)
  }

  onDeleteTask(taskId: number): void {
    this.tasks.update((taskList) => taskList.filter(task => task.id !== taskId))
  }

  onAddTask(taskTitle: string, taskDescription: string): void {
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
