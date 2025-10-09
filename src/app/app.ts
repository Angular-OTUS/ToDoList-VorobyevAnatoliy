import { Component } from '@angular/core';
import {ToDoList} from './components/to-do-list/to-do-list';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [ToDoList, RouterOutlet],
})
export class App {
}
