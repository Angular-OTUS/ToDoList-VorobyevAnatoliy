import {Component, computed, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
  ],
  templateUrl: './button.html',
  standalone: true,
  styleUrl: './button.css',
})
export class Button {

  title = input('');

  disabled = input( false);

  action = input<ActionType>('none')

  isAdd = computed(() => this.action() === 'add')

  isDelete = computed(() => this.action() === 'delete')
}

type ActionType = 'add' | 'delete' | 'none';
