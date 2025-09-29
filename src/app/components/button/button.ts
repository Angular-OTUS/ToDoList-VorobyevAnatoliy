import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {ActionType} from '../../models/button-action';

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
}
