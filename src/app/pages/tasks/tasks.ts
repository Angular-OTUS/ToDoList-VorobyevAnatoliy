import { Component } from '@angular/core';
import {ToDoStatusSelector} from '../../components/to-do-status-selector/to-do-status-selector';
import {ToDoCreateItem} from '../../components/to-do-create-item/to-do-create-item';
import {ToDoList} from '../../components/to-do-list/to-do-list';
import {Toasts} from '../../components/toasts/toasts';
import {ToDoItemView} from '../../components/to-do-item-view/to-do-item-view';

@Component({
  selector: 'app-tasks',
  imports: [
    ToDoStatusSelector,
    ToDoCreateItem,
    ToDoList,
    Toasts,
    ToDoItemView,
  ],
  templateUrl: './tasks.html',
  standalone: true,
  styleUrl: './tasks.css',
})
export class Tasks {

}
