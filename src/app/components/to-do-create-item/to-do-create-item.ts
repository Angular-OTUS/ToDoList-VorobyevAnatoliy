import {Component, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskData, TaskStatus} from '../../models/task';
import {TooltipDirective} from '../../directives/tooltip';
import {Button} from '../button/button';
import {tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-do-create-item',
  imports: [
    ReactiveFormsModule,
    TooltipDirective,
    Button,
  ],
  templateUrl: './to-do-create-item.html',
  standalone: true,
  styleUrl: './to-do-create-item.css',
})
export class ToDoCreateItem implements OnInit {

  private formBuilder = inject(FormBuilder)

  protected createTaskForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  })

  protected readonly newTaskData = output<TaskData>()

  protected readonly newTaskTitleIsEmpty = signal(true)

  private destroy$ = inject(DestroyRef)

  ngOnInit() {
    this.subscribeOnChanges()
  }

  private subscribeOnChanges() {
    this.createTaskForm.controls['name'].valueChanges.pipe(
      takeUntilDestroyed(this.destroy$),
      tap((value: string) => this.newTaskTitleIsEmpty.set(value === null || value.length === 0)),
    ).subscribe()
  }

  protected onSubmit(): void {
    this.newTaskData.emit({
      text: this.createTaskForm.value.name,
      description: this.createTaskForm.value.description,
      status: TaskStatus.InProgress,
    })
    this.createTaskForm.reset()
  }
}
