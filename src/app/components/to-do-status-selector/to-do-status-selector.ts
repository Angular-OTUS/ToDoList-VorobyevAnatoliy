import {Component, model} from '@angular/core';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {Status, TaskStatus} from '../../models/task';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-to-do-status-selector',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    MatOption,
  ],
  templateUrl: './to-do-status-selector.html',
  standalone: true,
  styleUrl: './to-do-status-selector.css',
})
export class ToDoStatusSelector {

  public selectedStatus = model<Status>(TaskStatus.NotSet)

  protected readonly taskStatus = TaskStatus;

  onChanged($event: MatSelectChange<Status>) {
    this.selectedStatus.set($event.value)
  }
}
