import {Component, computed, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {ActionType} from './action-types';

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

  readonly title = input('');

  readonly disabled = input( false);

  readonly action = input<ActionType>('none')

  readonly isAdd = computed(() => this.action() === 'add')

  readonly isDelete = computed(() => this.action() === 'delete')

  readonly isSave = computed(() => this.action() === 'save')
}
