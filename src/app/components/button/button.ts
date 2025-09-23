import {Component, computed, Input, Signal} from '@angular/core';
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

  @Input()
  title = '';

  @Input()
  disabled = false;

  @Input()
  action: 'add' | 'delete' | 'none' = 'none'

  isAdd: Signal<boolean> = computed(() => this.action === 'add')

  isDelete: Signal<boolean> = computed(() => this.action === 'delete')
}
