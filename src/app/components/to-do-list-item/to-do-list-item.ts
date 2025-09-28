import {Component, input, output} from '@angular/core';
import {Task} from '../../models/task';
import {Button} from '../button/button';
import {TooltipDirective} from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    Button,
    TooltipDirective,
  ],
  templateUrl: './to-do-list-item.html',
  standalone: true,
  styleUrl: './to-do-list-item.css',
})
export class ToDoListItem {

  readonly task = input.required<Task>();

  readonly deleteMe = output<void>();

  onDeleteTask(): void {
    this.deleteMe.emit()
  }
}
