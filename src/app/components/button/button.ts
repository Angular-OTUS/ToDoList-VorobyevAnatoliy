import {Component, computed, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.html',
  standalone: true,
  styleUrl: './button.css'
})
export class Button {

  @Input()
  title: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  action: 'add' | 'delete' | 'none' = 'none'

  isAdd = computed(() => this.action === 'add')

  isDelete = computed(() => this.action === 'delete')
}
