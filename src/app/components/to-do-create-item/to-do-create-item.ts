import {Component, computed, inject, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {TaskData, TaskStatus} from '../../models/task';
import {Button} from '../button/button';
import {TooltipDirective} from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-create-item',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    Button,
    TooltipDirective,
  ],
  templateUrl: './to-do-create-item.html',
  standalone: true,
  styleUrl: './to-do-create-item.css',
})
export class ToDoCreateItem {

  private formBuilder = inject(FormBuilder)

  protected createTaskForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  })

  protected readonly newTaskData = output<TaskData>()

  protected readonly newTaskTitle = signal('')

  protected readonly newTaskTitleIsEmpty = computed(() => !this.newTaskTitle().trim())

  protected onSubmit(): void {
    this.newTaskData.emit({
      text: this.createTaskForm.value.name,
      description: this.createTaskForm.value.description,
      status: TaskStatus.InProgress,
    })
  }
}
