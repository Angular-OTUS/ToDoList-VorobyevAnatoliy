import {Component, inject, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskData, TaskStatus} from '../../models/task';
import {TooltipDirective} from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-create-item',
  imports: [
    ReactiveFormsModule,
    TooltipDirective,
  ],
  templateUrl: './to-do-create-item.html',
  standalone: true,
  styleUrl: './to-do-create-item.css',
})
export class ToDoCreateItem implements OnInit{

  private formBuilder = inject(FormBuilder)

  protected createTaskForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  })

  protected readonly newTaskData = output<TaskData>()

  protected readonly newTaskTitleIsEmpty = signal(true)

  ngOnInit() {
    this.createTaskForm.controls['name'].valueChanges
      .subscribe((value: string) => this.newTaskTitleIsEmpty.set(value.length === 0))
  }

  protected onSubmit(): void {
    this.newTaskData.emit({
      text: this.createTaskForm.value.name,
      description: this.createTaskForm.value.description,
      status: TaskStatus.InProgress,
    })
  }
}
