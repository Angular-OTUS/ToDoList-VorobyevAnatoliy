import {Component, computed, input, InputSignal, Signal} from '@angular/core';
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

  title: InputSignal<string> = input('');

  disabled: InputSignal<boolean> = input( false);

  action: InputSignal<ActionType> = input<ActionType>('none')

  isAdd: Signal<boolean> = computed(() => this.action() === 'add')

  isDelete: Signal<boolean> = computed(() => this.action() === 'delete')
}

type ActionType = 'add' | 'delete' | 'none';
