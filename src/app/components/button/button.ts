import {Component, HostListener, input} from '@angular/core';
import {ActionType} from '../../models/button-action';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  standalone: true,
  styleUrl: './button.css',
})
export class Button {

  public readonly disabled = input( false);

  public readonly action = input<ActionType>('none')

  @HostListener('click', ['$event'])
  protected onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
